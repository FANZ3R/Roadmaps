/* AI Engineer roadmap. Format is described in data-scientist.js. */
RM.addRoadmap({
  id: "ai-engineer",
  code: "AI",
  title: "AI Engineer",
  color: "#8A3FC7",
  colorDark: "#C08CF0",
  summary: "Builds reliable products on top of foundation models: context, retrieval, tools, agents, evals, and the software that holds them together.",
  phases: [
    {
      title: "Start here",
      note: "Pehle system, phir syllabus. Jo production mein pehle se kar chuke ho, use calibration mode mein mark karo; bas itna dhyan rakho ki bina notes ke samjha bhi sako.",
      topics: ["learning-system", "role-ai"]
    },
    {
      title: "Software engineering foundations",
      note: "AI engineer ka code production mein chalta hai. Async, types aur tests pe pakad sabse zyada fark daalti hai.",
      topics: ["py-core", "py-advanced", "cli-linux", "git", "testing", "sw-design"],
      projects: [{
        id: "ai-llm-client",
        title: "LLM client toolkit",
        brief: "A small, well-tested Python library that wraps LLM calls the way production code should.",
        done: [
          "Async client with retries, timeouts and backoff",
          "Streaming support",
          "Token and cost tracking for every call",
          "Typed structured outputs validated with Pydantic",
          "Tests with mocked API responses, green in CI"
        ]
      }]
    },
    {
      title: "Backend, data and the web",
      note: "Har AI feature ke peeche ek normal backend hota hai. FastAPI, Postgres aur thoda frontend aana hi chahiye.",
      topics: ["apis-backend", "db-fundamentals", "sql-fundamentals"],
      extra: ["networking", "web-fundamentals"],
      projects: [{
        id: "ai-backend-service",
        title: "Backend service in the cloud",
        brief: "A FastAPI service with auth, Postgres and background jobs, deployed to a public URL.",
        done: [
          "JWT or API-key authentication",
          "Postgres with migrations",
          "Background job queue for slow tasks",
          "Integration tests and OpenAPI docs",
          "Deployed on Cloud Run or similar"
        ]
      }]
    },
    {
      title: "ML and deep learning essentials",
      note: "Model train nahi karna, par samajhna zaroori hai. Attention aur evaluation clear ho to LLM ka behaviour predict kar paoge.",
      topics: ["ml-foundations", "model-eval", "dl-foundations", "pytorch", "transformers"],
      extra: ["linalg", "probability", "nlp-classical"],
      projects: [{
        id: "ai-attention-understood",
        title: "Attention, understood",
        brief: "Build and inspect a tiny transformer so model behaviour stops being magic.",
        done: [
          "A character-level GPT trained from scratch",
          "Attention maps visualized for a few inputs",
          "A BERT-style classifier fine-tuned with Hugging Face",
          "Notes explaining tokens, attention and sampling in your own words"
        ]
      }]
    },
    {
      title: "LLM fundamentals and prompting",
      note: "Prompt ko code ki tarah treat karo: version karo, test karo, measure karo. Yahin se evals ki aadat shuru hoti hai.",
      topics: ["llm-fundamentals", "llm-apis", "prompting"],
      projects: [{
        id: "ai-structured-extraction",
        title: "Structured extraction service",
        brief: "Turn messy documents such as invoices, emails or PDFs into validated JSON, and measure how well it works.",
        done: [
          "Tool calling or JSON schema output validated with Pydantic",
          "A labelled eval set of 50 documents",
          "Field-level accuracy report with error categories",
          "Three prompt versions compared on the eval set",
          "Cost and latency per document measured"
        ]
      }]
    },
    {
      title: "Retrieval and RAG",
      note: "RAG pehle search problem hai, phir generation. Retrieval ko alag se measure karna seekho, tabhi sahi jagah fix kar paoge.",
      topics: ["ir-search", "embeddings-vectordb", "rag"],
      projects: [{
        id: "ai-rag-defensible",
        title: "RAG you can defend",
        brief: "A retrieval-augmented assistant over a real document set, with measured quality at every stage.",
        done: [
          "Hybrid retrieval (BM25 plus dense) with a reranker",
          "Answers cite their sources",
          "Retrieval eval with recall@k and MRR on 50 labelled questions",
          "Ablation table of chunking and retrieval variants",
          "Failure analysis that separates retrieval misses from generation misses"
        ]
      }]
    },
    {
      title: "Evals and observability",
      note: "Ye AI engineering ka sabse important phase hai. Jo measure nahi kar sakte, use improve bhi nahi kar sakte.",
      topics: ["llm-evals", "llmops"],
      projects: [{
        id: "ai-eval-harness",
        title: "Reusable eval harness",
        brief: "Evaluation and tracing infrastructure you can drop into any LLM project.",
        done: [
          "Every request traced with Langfuse or OpenTelemetry",
          "Error analysis notebook with a failure taxonomy",
          "LLM-as-judge calibrated against 100 human labels",
          "Eval suite runs in CI and blocks regressions"
        ]
      }]
    },
    {
      title: "Agents and tools",
      note: "Pehle bina framework ke agent loop likho, phir framework use karo. Aur hamesha poocho: kya simple workflow kaafi tha?",
      topics: ["agents", "agent-frameworks", "mcp"],
      projects: [{
        id: "ai-useful-agent",
        title: "An agent that does real work",
        brief: "An agent that completes real multi-step tasks with tools, measured honestly.",
        done: [
          "Agent loop written once without any framework",
          "Same agent rebuilt in LangGraph with checkpointing",
          "Four to six well-designed tools, including an MCP server you wrote",
          "Task success rate measured on 30 test tasks",
          "Step, cost and time limits plus a human approval step"
        ]
      }]
    },
    {
      title: "Customizing and multimodal models",
      note: "Fine-tuning tab karo jab eval set bole ki zaroorat hai. Multimodal ka sabse practical use document extraction hai.",
      topics: ["fine-tuning"],
      extra: ["multimodal", "llm-from-scratch"],
      projects: [{
        id: "ai-finetune-vs-prompt",
        title: "Fine-tune to beat the prompt",
        brief: "Show when fine-tuning a small model wins on quality, cost or latency, and when it does not.",
        done: [
          "Dataset curated and split properly",
          "QLoRA fine-tune of a small open model",
          "Compared against a prompted larger model on the same eval",
          "Quality, latency and cost table with a recommendation"
        ]
      }]
    },
    {
      title: "Production AI",
      note: "Demo aur production mein fark: security, cost, latency aur failure handling. Is phase mein apna ek purana project production-grade banao.",
      topics: ["llm-inference", "docker", "cicd", "ai-security", "ai-app-frontend", "system-design"],
      extra: ["cloud-fundamentals"],
      projects: [{
        id: "ai-production-hardening",
        title: "Production hardening",
        brief: "Take one of your earlier projects to production quality.",
        done: [
          "Open model self-hosted with vLLM, or an API setup with routing and fallbacks",
          "Semantic cache with a measured hit rate",
          "Prompt injection test suite and guardrails",
          "Streaming frontend with feedback buttons",
          "Cost dashboard with alerts"
        ]
      }]
    },
    {
      title: "Product, interviews and portfolio",
      note: "AI interviews mein sabse bada sawaal hota hai: kya ship kiya aur kaise measure kiya. Apni stories numbers ke saath taiyaar rakho.",
      topics: ["ai-product", "interview-ai", "interview-behavioral", "portfolio"],
      projects: [{
        id: "ai-capstone",
        title: "Capstone: an AI product with real users",
        brief: "Something at least five real people use, improved using data from their usage.",
        done: [
          "A clear user problem and a success metric",
          "Evals, tracing and a feedback loop running in production",
          "Two improvement cycles driven by user data",
          "Public write-up with metrics and lessons",
          "Short demo video"
        ]
      }]
    }
  ]
});
