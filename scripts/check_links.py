#!/usr/bin/env python3
"""Check every resource link in data/**/*.js. Standard library only.

Exits 1 when a link is definitely broken: HTTP 404 or 410, or the host does not resolve.
Sites that block bots (401, 403, 429), server errors and timeouts are reported as warnings,
because they usually work in a browser.

Usage: python3 scripts/check_links.py
"""
from __future__ import annotations

import concurrent.futures as futures
import os
import re
import socket
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
URL_RE = re.compile(r"https?://[A-Za-z0-9][^\s\"'<>`]*")
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/128.0 Safari/537.36"
)
BROKEN_STATUS = {404, 410}
DNS_HINTS = ("Name or service not known", "nodename nor servname", "getaddrinfo failed",
             "No address associated", "Temporary failure in name resolution", "gaierror")
TIMEOUT = 25
WORKERS = 16


def collect() -> dict[str, str]:
    """Map each unique URL to the first place it appears."""
    found: dict[str, str] = {}
    for path in sorted((ROOT / "data").rglob("*.js")):
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            for url in URL_RE.findall(line):
                url = url.rstrip(".,;)")
                found.setdefault(url, f"{path.relative_to(ROOT)}:{number}")
    return found


def fetch(url: str) -> tuple[int | None, str]:
    request = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/pdf,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    })
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
            return response.status, ""
    except urllib.error.HTTPError as err:
        return err.code, str(err.reason)
    except urllib.error.URLError as err:
        return None, f"{type(err.reason).__name__}: {err.reason}"
    except (socket.timeout, TimeoutError):
        return None, "timeout"
    except (ssl.SSLError, ConnectionError, OSError) as err:
        return None, f"{type(err).__name__}: {err}"


def check(url: str) -> tuple[str, int | None, str]:
    status, detail = fetch(url)
    if status is None or status in BROKEN_STATUS or status >= 500 or status == 429:
        time.sleep(3)
        status, detail = fetch(url)
    return url, status, detail


def classify(status: int | None, detail: str) -> str:
    if status is not None and status < 400:
        return "ok"
    if status in BROKEN_STATUS:
        return "broken"
    if status is None and (any(hint in detail for hint in DNS_HINTS) or "refused" in detail.lower()):
        return "broken"
    return "warning"


def main() -> int:
    links = collect()
    print(f"Checking {len(links)} unique links...")
    results: list[tuple[str, int | None, str, str]] = []
    with futures.ThreadPoolExecutor(max_workers=WORKERS) as pool:
        for url, status, detail in pool.map(check, links):
            results.append((url, status, detail, classify(status, detail)))

    broken = [r for r in results if r[3] == "broken"]
    warnings = [r for r in results if r[3] == "warning"]
    ok_count = len(results) - len(broken) - len(warnings)

    def describe(item: tuple[str, int | None, str, str]) -> str:
        url, status, detail, _ = item
        return f"{status if status is not None else 'no response'} {detail}".strip() + f"  {url}  ({links[url]})"

    for item in broken:
        print("BROKEN   " + describe(item))
    for item in warnings:
        print("WARNING  " + describe(item))
    print(f"\n{ok_count} ok, {len(warnings)} warnings, {len(broken)} broken.")

    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as out:
            out.write(f"## Link check\n\n{ok_count} ok, {len(warnings)} warnings, {len(broken)} broken.\n\n")
            for title, group in (("Broken", broken), ("Warnings (check by hand)", warnings)):
                if not group:
                    continue
                out.write(f"### {title}\n\n| Status | Link | Where |\n|---|---|---|\n")
                for url, status, detail, _ in group:
                    shown = f"{status if status is not None else 'no response'} {detail}".strip().replace("|", "/")
                    out.write(f"| {shown} | {url} | {links[url]} |\n")
                out.write("\n")

    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
