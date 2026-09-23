/*
  Topic library: learning system, role orientation, programming and CS foundations.

  Format of every topic:
    "topic-id": {
      title: "Shown as the topic heading",
      subs:  ["Checkable item", ...],             // each item is ticked separately
      res:   [["Label", "https://...", "kind"]],  // first one is the "start with" pick
      tip:   "How to study it (optional)"
    }

  Topic ids are shared by every roadmap: tick an item once and it counts on every line.
  Editing an item's text resets that one tick, because progress is keyed by the text.
  Resource kinds: course, book, video, docs, article, practice, repo, paper, tool.
*/
RM.addTopics({
  "learning-system": {
    title: "How to learn (and not quit this time)",
    subs: [
      "Fix a weekly schedule: 3 to 5 study blocks you actually protect",
      "Set a minimum daily dose: 25 focused minutes counts, zero does not",
      "Active recall: close the tab and write what you learned from memory",
      "Spaced repetition: an Anki deck for formulas, definitions and gotchas",
      "Feynman check: explain each topic in five plain sentences in your notes",
      "Build over watch: every topic ends in code, a derivation or a write-up",
      "Weekly review ritual: update this tracker and pick next week's topics",
      "Never miss twice: one missed day is fine, two in a row is the warning sign"
    ],
    res: [
      ["Learning How to Learn (Coursera, free to audit)", "https://www.coursera.org/learn/learning-how-to-learn", "course"],
      ["How to write good prompts: spaced repetition (Andy Matuschak)", "https://andymatuschak.org/prompts/", "article"],
      ["Augmenting Long-term Memory (Michael Nielsen)", "http://augmentingcognition.com/ltm.html", "article"],
      ["Anki", "https://apps.ankiweb.net/", "tool"]
    ],
    tip: "Motivation pe bharosa mat karo, system pe karo. Roz ka chhota target rakho taaki bura din bhi zero na jaaye. Har Sunday 15 minute ka review: kya hua, next kya."
  },

  "role-ds": {
    title: "The data scientist role, clearly",
    subs: [
      "Flavours of the role: product/analytics DS, ML-focused DS, decision science",
      "What a data scientist owns: question, metric, analysis, model, decision",
      "Where the lines are: DS vs analyst vs ML engineer vs AI engineer",
      "What DS interviews test: SQL, statistics, ML, product sense, communication",
      "Map 10 real job descriptions onto the phases of this roadmap"
    ],
    res: [
      ["Data science is different now (Vicki Boykis)", "https://vickiboykis.com/2019/02/13/data-science-is-different-now/", "article"],
      ["Machine Learning Interviews, ch. 1 on ML jobs (Chip Huyen)", "https://huyenchip.com/ml-interviews-book/", "book"]
    ],
    tip: "10 real JDs padho aur har requirement ko is roadmap ke kisi phase se match karo. Market kya maang raha hai, woh saaf dikh jaayega."
  },

  "role-mle": {
    title: "The ML engineer role, clearly",
    subs: [
      "MLE vs data scientist vs research engineer vs AI engineer",
      "The lifecycle an MLE owns: data, training, serving, monitoring",
      "Why most ML work is data and infrastructure, not model code",
      "What MLE interviews test: coding, ML depth, ML system design",
      "Map 10 real job descriptions onto the phases of this roadmap"
    ],
    res: [
      ["Machine Learning Interviews (Chip Huyen)", "https://huyenchip.com/ml-interviews-book/", "book"],
      ["Rules of Machine Learning (Google)", "https://developers.google.com/machine-learning/guides/rules-of-ml", "article"]
    ],
    tip: "Rules of ML abhi ek baar padho, aur MLOps phase ke baad dobara. Dusri baar kaafi zyada samajh aayega."
  },

  "role-ai": {
    title: "The AI engineer role, clearly",
    subs: [
      "AI engineer vs ML engineer: building on top of foundation models",
      "The stack: models, context, retrieval, tools, evals, UX",
      "Why evals and feedback loops decide who ships reliable AI",
      "What AI engineer interviews test: coding, LLM system design, evals",
      "Map 10 real job descriptions onto the phases of this roadmap"
    ],
    res: [
      ["The Rise of the AI Engineer (swyx, Latent Space)", "https://www.latent.space/p/ai-engineer", "article"],
      ["Common pitfalls when building generative AI applications (Chip Huyen)", "https://huyenchip.com/2025/01/16/ai-engineering-pitfalls.html", "article"]
    ],
    tip: "AI engineer ka kaam model train karna kam, reliable system banana zyada hai. Har JD mein dekho: evals, RAG, agents aur deployment kitni baar aata hai."
  },

  "py-core": {
    title: "Python core language",
    subs: [
      "Types, operators, control flow, functions and scope",
      "Lists, dicts, sets, tuples and comprehensions",
      "Strings, f-strings, file I/O, JSON and CSV",
      "Exceptions: try, except, finally, and raising your own",
      "Modules, packages, imports and virtual environments",
      "Classes: __init__, dunder methods, inheritance, dataclasses",
      "Iterators, generators and yield",
      "Decorators and context managers",
      "A daily workflow in Jupyter and VS Code"
    ],
    res: [
      ["CS50's Introduction to Programming with Python (Harvard)", "https://cs50.harvard.edu/python/", "course"],
      ["The Python Tutorial (official)", "https://docs.python.org/3/tutorial/", "docs"],
      ["Automate the Boring Stuff with Python", "https://automatetheboringstuff.com/", "book"]
    ],
    tip: "Syntax ratne ki jagah roz chhote scripts likho. CS50P ke problem sets zaroor karo, sirf videos dekhna kaafi nahi."
  },

  "py-advanced": {
    title: "Production-grade Python",
    subs: [
      "Type hints, mypy or pyright, and Pydantic models",
      "Project layout, pyproject.toml, uv and dependency pinning",
      "pytest: fixtures, parametrize, mocking",
      "Logging, config from environment variables, CLIs with argparse or Typer",
      "Concurrency: threads vs processes vs asyncio, and the GIL",
      "Profiling with cProfile; vectorize before you optimize",
      "Linting and formatting with ruff; pre-commit hooks",
      "Idiomatic Python: EAFP, iterators, no mutable default arguments"
    ],
    res: [
      ["Beyond the Basic Stuff with Python (Al Sweigart)", "https://inventwithpython.com/beyond/", "book"],
      ["Packaging Python projects (official guide)", "https://packaging.python.org/en/latest/tutorials/packaging-projects/", "docs"],
      ["pytest: get started", "https://docs.pytest.org/en/stable/getting-started.html", "docs"],
      ["Async IO in Python: a complete walkthrough (Real Python)", "https://realpython.com/async-io-python/", "article"],
      ["uv documentation", "https://docs.astral.sh/uv/", "docs"]
    ],
    tip: "Apne kisi purane script ko production quality mein convert karo: types, tests, logging, CLI. Ek baar karoge to aadat ban jaayegi."
  },

  "cli-linux": {
    title: "Command line, shell and Linux",
    subs: [
      "Filesystem navigation, permissions and ownership",
      "Processes and signals: top, htop, kill, background jobs",
      "Pipes and redirection; grep, sed, awk, find, xargs",
      "Bash scripting: variables, loops, exit codes, set -euo pipefail",
      "SSH keys, scp and rsync, tmux sessions",
      "Environment variables, PATH, cron and systemd basics",
      "Network tools: curl, ping, dig, ss"
    ],
    res: [
      ["The Missing Semester of Your CS Education (MIT)", "https://missing.csail.mit.edu/", "course"],
      ["The Linux Command Line (William Shotts)", "https://linuxcommand.org/tlcl.php", "book"],
      ["OverTheWire: Bandit", "https://overthewire.org/wargames/bandit/", "practice"]
    ],
    tip: "Bandit ko game ki tarah khelo, roz 2 se 3 levels. Missing Semester ke shell aur tools wale lectures sabse kaam ke hain."
  },

  "git": {
    title: "Git and GitHub",
    subs: [
      "Commits, the staging area, history and diffs",
      "Branches, merge vs rebase, resolving conflicts",
      "Undoing things: reset, revert, restore, reflog",
      "Remotes, pull requests and code review etiquette",
      "Good commit messages and small, focused pull requests",
      ".gitignore, tags and releases",
      "A basic CI workflow with GitHub Actions"
    ],
    res: [
      ["Learn Git Branching (interactive)", "https://learngitbranching.js.org/", "practice"],
      ["Pro Git", "https://git-scm.com/book/en/v2", "book"],
      ["GitHub Actions documentation", "https://docs.github.com/en/actions", "docs"]
    ],
    tip: "Learn Git Branching ke saare levels ek weekend mein ho jaate hain. Rebase aur reflog se darr nikal gaya to Git solved."
  },

  "dsa": {
    title: "Data structures and algorithms",
    subs: [
      "Big-O time and space analysis",
      "Arrays, strings, hashing, two pointers, sliding window",
      "Stacks, queues, monotonic stack, linked lists",
      "Binary search on arrays and on the answer",
      "Trees, binary search trees, heaps and tries",
      "Graphs: BFS, DFS, topological sort, Dijkstra, union-find",
      "Recursion and backtracking",
      "Dynamic programming: 1D, 2D, knapsack, LIS, intervals",
      "Greedy algorithms and interval problems"
    ],
    res: [
      ["NeetCode roadmap", "https://neetcode.io/roadmap", "practice"],
      ["Tech Interview Handbook", "https://www.techinterviewhandbook.org/", "article"],
      ["Competitive Programmer's Handbook (Antti Laaksonen)", "https://cses.fi/book/book.pdf", "book"],
      ["CSES Problem Set", "https://cses.fi/problemset/", "practice"]
    ],
    tip: "Problems ratne ki jagah pattern pehchaano. Har problem ke baad ek line likho: kaunsa pattern, aur kyun."
  },

  "os": {
    title: "Operating systems essentials",
    subs: [
      "Processes vs threads, context switching, scheduling",
      "Memory: stack vs heap, virtual memory, paging",
      "Concurrency bugs: race conditions, locks, deadlocks",
      "File systems, I/O, buffering and the page cache",
      "System calls and what happens when a program runs"
    ],
    res: [
      ["Operating Systems: Three Easy Pieces (OSTEP)", "https://pages.cs.wisc.edu/~remzi/OSTEP/", "book"],
      ["The Missing Semester (MIT)", "https://missing.csail.mit.edu/", "course"]
    ],
    tip: "OSTEP ke virtualization aur concurrency chapters kaafi hain. Har concept ko ek chhote C ya Python experiment se dekho."
  },

  "networking": {
    title: "Networking and the web, under the hood",
    subs: [
      "The TCP/IP model, ports, TCP vs UDP",
      "DNS resolution end to end",
      "HTTP/1.1 and HTTP/2: methods, headers, status codes, cookies",
      "TLS and HTTPS: certificates and the handshake",
      "REST vs gRPC vs WebSockets vs Server-Sent Events",
      "Proxies, load balancers, CDNs, NAT and firewalls",
      "What happens when you type a URL and press Enter"
    ],
    res: [
      ["High Performance Browser Networking (Ilya Grigorik)", "https://hpbn.co/", "book"],
      ["HTTP (MDN Web Docs)", "https://developer.mozilla.org/en-US/docs/Web/HTTP", "docs"],
      ["Beej's Guide to Network Programming", "https://beej.us/guide/bgnet/", "book"]
    ],
    tip: "Browser devtools ka Network tab khol ke real requests padho. curl -v se headers dekhne ki aadat daalo."
  },

  "db-fundamentals": {
    title: "Database fundamentals",
    subs: [
      "Relational model, keys, constraints, normalization up to 3NF",
      "Indexes: B-trees, composite indexes, when an index is ignored",
      "Transactions, ACID, isolation levels and locking",
      "Reading EXPLAIN output and query plans",
      "OLTP vs OLAP; row stores vs column stores",
      "NoSQL families: key-value, document, wide-column, graph",
      "Replication, backups and connection pooling"
    ],
    res: [
      ["CMU 15-445/645 Database Systems (Andy Pavlo)", "https://15445.courses.cs.cmu.edu/", "course"],
      ["Use The Index, Luke", "https://use-the-index-luke.com/", "book"]
    ],
    tip: "Pavlo ke lectures entertaining bhi hain aur deep bhi. Indexes aur transactions pe khaas dhyan do, interviews mein yahi poocha jaata hai."
  },

  "sw-design": {
    title: "Software design and clean code",
    subs: [
      "Separation of concerns, cohesion and coupling",
      "SOLID used pragmatically; composition over inheritance",
      "Design patterns: strategy, factory, adapter, observer",
      "Dependency injection and designing testable code",
      "Refactoring safely in small steps",
      "Code review: giving and receiving it well",
      "Reading unfamiliar codebases fast: entry points, tests, call paths",
      "Documentation: READMEs, docstrings, architecture notes"
    ],
    res: [
      ["Design patterns (Refactoring Guru)", "https://refactoring.guru/design-patterns", "article"],
      ["Python Design Patterns (Brandon Rhodes)", "https://python-patterns.guide/", "article"],
      ["Google Engineering Practices: code review", "https://google.github.io/eng-practices/", "docs"]
    ],
    tip: "Patterns ratne ka fayda nahi. Kisi achhe open-source repo ko padho aur dekho code kaise organize hai, phir apne code pe apply karo."
  },

  "testing": {
    title: "Testing and code quality",
    subs: [
      "Unit vs integration vs end-to-end tests; the test pyramid",
      "pytest fixtures, parametrization and mocking external services",
      "Test-driven development on one small feature",
      "Property-based testing with Hypothesis",
      "Testing data and ML code: contracts, shape and range checks",
      "Coverage, CI gates and flaky tests"
    ],
    res: [
      ["pytest documentation", "https://docs.pytest.org/en/stable/", "docs"],
      ["Testing ML systems (Made With ML)", "https://madewithml.com/courses/mlops/testing/", "course"],
      ["Hypothesis documentation", "https://hypothesis.readthedocs.io/", "docs"]
    ],
    tip: "Test likhna tab aata hai jab code testable ho. Pehle function chhote karo, side effects alag karo, phir tests aasaan ho jaate hain."
  }
});
