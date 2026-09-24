/* Forward Deployed Engineer roadmap. Format is described in data-scientist.js. */
RM.addRoadmap({
  id: "forward-deployed-engineer",
  code: "FDE",
  title: "Forward Deployed Engineer",
  color: "#D97A0A",
  colorDark: "#F2A541",
  summary: "Embeds with customers to turn messy, real problems into deployed software, often AI systems, and feeds what works back into the product.",
  phases: [
    {
      title: "Start here",
      note: "FDE ka core skill hai vague problem ko concrete plan mein todna. Code se pehle ye muscle banao, aur jo pehle se aata hai use calibration mode mein mark karo.",
      topics: ["learning-system", "fde-role"],
      projects: [{
        id: "fde-decomposition-drills",
        title: "Decomposition drills",
        brief: "Practice the core FDE thinking skill before writing any code.",
        done: [
          "Five vague prompts decomposed into plans, for example 'reduce hospital wait times'",
          "Each plan lists stakeholders, data needed, a first milestone and risks",
          "One plan reviewed by someone else and revised",
          "Your own FDE operating principles written on one page"
        ]
      }]
    },
    {
      title: "Engineering foundations",
      note: "Customer site pe koi senior engineer saath nahi baitha hoga. Jaldi aur bharosemand code likhna yahin se aata hai.",
      topics: ["py-core", "py-advanced", "cli-linux", "git", "dsa", "testing"],
      projects: [{
        id: "fde-automation-toolkit",
        title: "Automation toolkit",
        brief: "Scripts that fix real annoyances fast, the way you would on a customer site.",
        done: [
          "A CLI that syncs data between two APIs with retries",
          "A script that cleans and validates a messy Excel export",
          "Both tested and documented",
          "Each one built within a single weekend"
        ]
      }]
    },
    {
      title: "Full-stack development",
      note: "FDE ko end-to-end tool khud banana aana chahiye: frontend, backend, database. Design perfect nahi, kaam ka hona chahiye.",
      topics: ["web-fundamentals", "typescript", "react-frontend", "apis-backend"],
      extra: ["sw-design"],
      projects: [{
        id: "fde-internal-tool",
        title: "Internal tool, full stack",
        brief: "A vendor onboarding portal or a similar internal tool, built end to end.",
        done: [
          "React or Next.js frontend with forms and validation",
          "FastAPI backend with Postgres",
          "File upload and role-based access",
          "Deployed with a public URL",
          "A three-minute walkthrough recording"
        ]
      }]
    },
    {
      title: "Data and integration",
      note: "Customer ka data hamesha bikhra hua milega. Integration aur entity resolution FDE ki roz ki zindagi hai.",
      topics: ["sql-fundamentals", "db-fundamentals", "pandas", "data-eng-fundamentals", "enterprise-integration", "domain-modeling"],
      extra: ["sql-advanced"],
      projects: [{
        id: "fde-integration-pipeline",
        title: "Integration pipeline",
        brief: "Unify three messy sources into one canonical model that people can trust.",
        done: [
          "Sources: a CSV dump, a paginated and rate-limited REST API, and a Postgres database",
          "Entity resolution that deduplicates records across sources",
          "Canonical data model documented",
          "Incremental sync with idempotent writes",
          "Data quality checks with alerts"
        ]
      }]
    },
    {
      title: "Cloud, deployment and infrastructure",
      note: "Har customer ka environment alag hota hai: cloud, VPC, kabhi on-prem. Reproducible deployment hi sukoon deta hai.",
      topics: ["docker", "kubernetes", "cloud-fundamentals", "iac", "cicd"],
      extra: ["networking"],
      projects: [{
        id: "fde-terraform-deploy",
        title: "Deploy it the way a customer would require",
        brief: "Put your full-stack tool and pipeline on cloud infrastructure, reproducibly.",
        done: [
          "All infrastructure defined in Terraform",
          "Private networking for the database",
          "Secrets in a secret manager, none in code",
          "CI/CD from merge to deploy",
          "One-command teardown and rebuild, tested"
        ]
      }]
    },
    {
      title: "Security, reliability and enterprise readiness",
      note: "Enterprise deal aksar security review pe atakti hai. SSO, RBAC aur audit logs pehle din se socho.",
      topics: ["auth-security", "compliance-privacy", "observability"],
      projects: [{
        id: "fde-enterprise-hardening",
        title: "Enterprise hardening",
        brief: "Make your system something a customer's IT and security teams would approve.",
        done: [
          "SSO login through OIDC",
          "Role-based access control with audit logs",
          "PII redaction where needed",
          "Dashboards, alerts and a runbook",
          "A one-page security overview written for the customer"
        ]
      }]
    },
    {
      title: "AI solutions",
      note: "Aaj ke zyadatar FDE roles AI deploy karne ke liye hain. RAG, agents aur evals ko customer ke data pe chalana seekho.",
      topics: ["llm-fundamentals", "llm-apis", "prompting", "embeddings-vectordb", "rag", "agents", "llm-evals", "ai-security", "ai-product"],
      extra: ["mcp"],
      projects: [{
        id: "fde-ai-assistant",
        title: "AI assistant on customer data",
        brief: "An assistant over the integrated data from the data phase, built for one specific group of users.",
        done: [
          "RAG plus tool calls into your own APIs",
          "Eval set built from realistic user questions",
          "Guardrails and permission-aware retrieval",
          "Demo script with a fallback path"
        ]
      }]
    },
    {
      title: "Customer-facing skills",
      note: "Ye skills sirf padhke nahi aati. Kisi asli insaan ke saath chhota engagement karo, chahe unpaid ho.",
      topics: ["customer-discovery", "consulting-skills", "product-sense", "technical-writing", "demos-presentations"],
      projects: [{
        id: "fde-mock-engagement",
        title: "A small real engagement",
        brief: "Run a small engagement with a local business, an NGO or a friend's startup, from discovery to handover.",
        done: [
          "Three discovery interviews with notes",
          "Problem statement with success metrics agreed by the client",
          "Scoped proposal with milestones and risks",
          "Weekly status updates sent for the whole engagement",
          "Final demo and handover document"
        ]
      }]
    },
    {
      title: "System design and delivery",
      note: "Deployment ka sabse bura din pehle se practice karo. Jab production mein aag lagegi, tab method kaam aayega, ghabrahat nahi.",
      topics: ["system-design", "llmops", "ai-app-frontend"],
      projects: [{
        id: "fde-incident-drill",
        title: "Incident drill",
        brief: "Rehearse the worst day of a deployment before it happens.",
        done: [
          "Design doc for your system with alternatives considered",
          "Three failures injected: a dead database, an API outage, a bad deploy",
          "Each one debugged using logs, metrics and traces",
          "A blameless postmortem written for one of them"
        ]
      }]
    },
    {
      title: "Interviews and portfolio",
      note: "FDE interviews mein decomposition, practical coding aur customer role-play hota hai. Teeno ka mock karo.",
      topics: ["interview-fde", "interview-behavioral", "portfolio"],
      projects: [{
        id: "fde-capstone",
        title: "Capstone: a deployment in a box",
        brief: "One engagement from first meeting to handover, documented like a real deployment.",
        done: [
          "Discovery notes and a problem statement",
          "Integration, application and AI layers deployed",
          "Evals and monitoring running",
          "Handover docs: architecture, runbook and a training guide",
          "Demo video and a case-study write-up"
        ]
      }]
    }
  ]
});
