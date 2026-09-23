/* Topic library: LLMs and AI engineering. Format is described in core.js. */
RM.addTopics({
  "llm-fundamentals": {
    title: "How LLMs work",
    subs: [
      "Tokenization with BPE, and the odd failures it causes",
      "Pretraining as next-token prediction",
      "Post-training: supervised fine-tuning, RLHF, DPO",
      "Reasoning models and test-time compute",
      "Sampling: temperature, top-p, top-k",
      "Context windows and long-context trade-offs",
      "Scaling laws, and why hallucinations happen",
      "Open-weight vs closed models; model families and sizes"
    ],
    res: [
      ["Deep Dive into LLMs like ChatGPT (Karpathy)", "https://www.youtube.com/watch?v=7xTGNNLPyMI", "video"],
      ["Let's build the GPT Tokenizer (Karpathy)", "https://www.youtube.com/watch?v=zduSFxRajkE", "video"],
      ["Hugging Face LLM Course", "https://huggingface.co/learn/llm-course", "course"],
      ["Illustrating RLHF (Hugging Face)", "https://huggingface.co/blog/rlhf", "article"]
    ],
    tip: "Karpathy ka 'Deep Dive' video 3 ghante ka hai par LLMs ki poori mental model ek baar mein bana deta hai. Notes banate hue dekho."
  },

  "llm-apis": {
    title: "Building with LLM APIs",
    subs: [
      "Chat message format and system prompts",
      "Streaming responses",
      "Token counting, cost and latency budgets",
      "Retries, timeouts, rate limits and backoff",
      "Structured outputs with JSON schema and Pydantic",
      "Tool (function) calling",
      "Multimodal inputs: images and PDFs",
      "Provider SDKs, and switching between providers"
    ],
    res: [
      ["Anthropic courses: API fundamentals and tool use", "https://github.com/anthropics/courses", "course"],
      ["Claude developer documentation", "https://docs.claude.com/", "docs"],
      ["OpenAI API documentation", "https://platform.openai.com/docs/overview", "docs"],
      ["OpenAI Cookbook", "https://cookbook.openai.com/", "article"]
    ],
    tip: "Do providers ke saath same feature banao, abstraction apne aap samajh aayega. Har call pe tokens aur cost log karne ki aadat abhi se."
  },

  "prompting": {
    title: "Prompt and context engineering",
    subs: [
      "Clear, specific instructions with success criteria",
      "Few-shot examples, and their pitfalls",
      "Structuring prompts with XML tags or sections",
      "Letting the model think: chain of thought, extended thinking",
      "Prompt chaining for multi-step tasks",
      "Context engineering: what goes into the window, and why",
      "Versioning prompts and testing them against an eval set"
    ],
    res: [
      ["Prompt engineering interactive tutorial (Anthropic)", "https://github.com/anthropics/prompt-eng-interactive-tutorial", "course"],
      ["Prompt engineering overview (Claude docs)", "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", "docs"],
      ["Effective context engineering for AI agents (Anthropic)", "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", "article"],
      ["Prompt Engineering Guide", "https://www.promptingguide.ai/", "article"]
    ],
    tip: "Prompt ko code ki tarah treat karo: version karo, eval set pe test karo, tab change karo. 'Lagta hai better hai' se decision mat lo."
  },

  "embeddings-vectordb": {
    title: "Embeddings and vector search",
    subs: [
      "What embeddings capture; bi-encoders vs cross-encoders",
      "Similarity: cosine, dot product, L2",
      "Choosing and evaluating embedding models",
      "ANN indexes: HNSW, IVF, product quantization",
      "Vector databases: Qdrant, pgvector, FAISS",
      "Metadata filtering and multi-tenancy",
      "Hybrid search: BM25 plus dense with score fusion"
    ],
    res: [
      ["Sentence Transformers documentation", "https://sbert.net/", "docs"],
      ["Faiss: The Missing Manual (Pinecone)", "https://www.pinecone.io/learn/series/faiss/", "article"],
      ["Qdrant documentation", "https://qdrant.tech/documentation/", "docs"],
      ["Efficient and robust ANN search using HNSW graphs", "https://arxiv.org/abs/1603.09320", "paper"]
    ],
    tip: "HNSW kaise kaam karta hai aur recall vs latency ka trade-off kya hai, ye interview mein zaroor poocha jaata hai. Ek chhota benchmark khud chalao."
  },

  "rag": {
    title: "Retrieval-augmented generation",
    subs: [
      "Ingestion: parsing PDFs, HTML and tables",
      "Chunking strategies and chunk metadata",
      "Retrieval: dense, sparse and hybrid",
      "Reranking with cross-encoders",
      "Query rewriting, decomposition and HyDE",
      "Contextual retrieval",
      "Context assembly, citations and grounding",
      "Text-to-SQL and question answering over tables",
      "GraphRAG: when a knowledge graph actually helps",
      "Failure analysis: retrieval miss vs generation miss"
    ],
    res: [
      ["RAG From Scratch (LangChain)", "https://github.com/langchain-ai/rag-from-scratch", "course"],
      ["LLM Zoomcamp (DataTalks.Club)", "https://github.com/DataTalksClub/llm-zoomcamp", "course"],
      ["Introducing Contextual Retrieval (Anthropic)", "https://www.anthropic.com/news/contextual-retrieval", "article"],
      ["Patterns for Building LLM-based Systems and Products (Eugene Yan)", "https://eugeneyan.com/writing/llm-patterns/", "article"]
    ],
    tip: "RAG ki har galti ko do dabbon mein daalo: sahi document mila hi nahi, ya mila par jawaab galat bana. Fix dono ke bilkul alag hote hain."
  },

  "llm-evals": {
    title: "Evaluating LLM systems",
    subs: [
      "Error analysis on real traces before writing any metric",
      "Building a failure taxonomy",
      "Code-based assertions vs LLM-as-judge",
      "Calibrating judges against human labels",
      "Golden datasets and synthetic test generation",
      "Retrieval metrics and faithfulness for RAG",
      "Regression tests for prompts in CI",
      "Online evaluation: user feedback and A/B tests"
    ],
    res: [
      ["Your AI Product Needs Evals (Hamel Husain)", "https://hamel.dev/blog/posts/evals/", "article"],
      ["What We Learned from a Year of Building with LLMs", "https://applied-llms.org/", "article"],
      ["Task-Specific LLM Evals that Do and Don't Work (Eugene Yan)", "https://eugeneyan.com/writing/evals/", "article"],
      ["Ragas documentation", "https://docs.ragas.io/", "docs"]
    ],
    tip: "Evals hi AI engineering ka asli skill hai. Pehle 50 se 100 real outputs khud padho aur galtiyan categorize karo, metric baad mein."
  },

  "agents": {
    title: "Agents and tool use",
    subs: [
      "The augmented LLM: retrieval, tools, memory",
      "Workflows: prompt chaining, routing, parallelization",
      "Orchestrator-workers and evaluator-optimizer patterns",
      "The agent loop: ReAct, plan then act",
      "Designing tools that models can use well",
      "Memory: short-term state and long-term stores",
      "Multi-agent systems: when they help and when they hurt",
      "Human in the loop, guardrails, cost and step limits",
      "Evaluating agents on end-to-end tasks"
    ],
    res: [
      ["Building effective agents (Anthropic)", "https://www.anthropic.com/engineering/building-effective-agents", "article"],
      ["Hugging Face AI Agents Course", "https://huggingface.co/learn/agents-course", "course"],
      ["LLM Powered Autonomous Agents (Lilian Weng)", "https://lilianweng.github.io/posts/2023-06-23-agent/", "article"],
      ["Agents (Chip Huyen)", "https://huyenchip.com/2025/01/07/agents.html", "article"]
    ],
    tip: "Pehle simple workflow se problem solve karne ki koshish karo, agent tab banao jab zaroorat ho. 'Building effective agents' ka yahi sabse bada sabak hai."
  },

  "agent-frameworks": {
    title: "Agent frameworks and orchestration",
    subs: [
      "Build an agent loop with no framework first",
      "LangGraph: state, nodes, edges, checkpointing",
      "Agent SDKs from model providers",
      "Durable execution, retries and resumable runs",
      "Tracing agent runs step by step",
      "Recognizing when a framework is overkill"
    ],
    res: [
      ["Introduction to LangGraph (LangChain Academy, free)", "https://academy.langchain.com/courses/intro-to-langgraph", "course"],
      ["LangGraph repository and docs", "https://github.com/langchain-ai/langgraph", "repo"],
      ["A practical guide to building agents (OpenAI)", "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf", "article"]
    ],
    tip: "Framework seekhne se pehle 100 lines ka apna agent loop likho. Phir framework ke abstractions ka matlab aur limitations dono samajh aayenge."
  },

  "mcp": {
    title: "Model Context Protocol",
    subs: [
      "Architecture: hosts, clients and servers",
      "Primitives: tools, resources and prompts",
      "Transports: stdio and streamable HTTP",
      "Build an MCP server in Python",
      "Auth and security: tool poisoning, over-broad permissions"
    ],
    res: [
      ["Model Context Protocol documentation", "https://modelcontextprotocol.io/", "docs"],
      ["Hugging Face MCP Course", "https://huggingface.co/learn/mcp-course", "course"],
      ["MCP Python SDK", "https://github.com/modelcontextprotocol/python-sdk", "repo"]
    ],
    tip: "Apne kisi existing API ya database ke liye ek MCP server banao aur kisi client se connect karo. Ek din ka kaam hai, portfolio mein achha dikhta hai."
  },

  "fine-tuning": {
    title: "Fine-tuning LLMs",
    subs: [
      "When to fine-tune vs prompt vs retrieve",
      "Dataset curation, formatting and chat templates",
      "Supervised fine-tuning",
      "LoRA and QLoRA: rank, alpha, target modules",
      "Preference tuning: DPO and its variants",
      "Evaluating a fine-tune against the base model",
      "Catastrophic forgetting and overfitting",
      "Tooling: TRL, PEFT, Unsloth"
    ],
    res: [
      ["smol-course (Hugging Face)", "https://github.com/huggingface/smol-course", "course"],
      ["LLM Course (Maxime Labonne)", "https://github.com/mlabonne/llm-course", "course"],
      ["Unsloth documentation", "https://docs.unsloth.ai/", "docs"],
      ["QLoRA: Efficient Finetuning of Quantized LLMs", "https://arxiv.org/abs/2305.14314", "paper"]
    ],
    tip: "Fine-tune tabhi karo jab eval set pe prompt aur RAG dono haar chuke hon. Data quality, hyperparameters se kahin zyada matter karti hai."
  },

  "llm-inference": {
    title: "LLM inference and serving",
    subs: [
      "Prefill vs decode, and why decode is memory-bound",
      "KV cache size math",
      "Continuous batching and PagedAttention",
      "Speculative decoding",
      "Quantized serving and its quality cost",
      "Latency metrics: time to first token, time per output token, throughput",
      "Serving stacks: vLLM, SGLang, llama.cpp, Ollama",
      "GPU sizing and cost per million tokens"
    ],
    res: [
      ["vLLM documentation", "https://docs.vllm.ai/", "docs"],
      ["Mastering LLM Techniques: Inference Optimization (NVIDIA)", "https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/", "article"],
      ["Transformer Inference Arithmetic (kipply)", "https://kipp.ly/transformer-inference-arithmetic/", "article"]
    ],
    tip: "KV cache ki memory ka formula khud nikaalo aur apne model pe lagao. Ye ek calculation GPU sizing ke saare sawaal solve kar deti hai."
  },

  "llm-from-scratch": {
    title: "Build an LLM from scratch",
    subs: [
      "Implement a BPE tokenizer",
      "Implement the GPT architecture in PyTorch",
      "Pretrain a small model on a custom corpus",
      "Load pretrained GPT-2 weights into your own code",
      "Instruction-tune it and evaluate",
      "Read a modern training codebase end to end"
    ],
    res: [
      ["Let's reproduce GPT-2 (124M) (Karpathy)", "https://www.youtube.com/watch?v=l8pRSuU81PU", "video"],
      ["LLMs-from-scratch code (Sebastian Raschka)", "https://github.com/rasbt/LLMs-from-scratch", "repo"],
      ["Stanford CS336: Language Modeling from Scratch", "https://cs336.stanford.edu/", "course"],
      ["nanochat (Karpathy)", "https://github.com/karpathy/nanochat", "repo"]
    ],
    tip: "Ye depth wala topic hai, jaldi nahi. Ek baar GPT-2 khud train kar liya to LLMs ke baare mein kisi bhi interview mein confidence alag level ka hoga."
  },

  "multimodal": {
    title: "Multimodal AI",
    subs: [
      "Vision-language models, and how images become tokens",
      "Document AI: layout, OCR and VLM-based extraction",
      "Speech-to-text with Whisper; text-to-speech",
      "Image generation and editing APIs",
      "Multimodal RAG over PDFs and screenshots"
    ],
    res: [
      ["Vision Language Models Explained (Hugging Face)", "https://huggingface.co/blog/vlms", "article"],
      ["Hugging Face Audio Course", "https://huggingface.co/learn/audio-course", "course"],
      ["Whisper", "https://github.com/openai/whisper", "repo"]
    ],
    tip: "Document extraction real companies mein sabse zyada maanga jaane wala multimodal use case hai. Accuracy har field ke level pe measure karo."
  },

  "ai-security": {
    title: "LLM security and guardrails",
    subs: [
      "Direct and indirect prompt injection",
      "The lethal trifecta: private data, untrusted content, a way to exfiltrate",
      "Jailbreaks, and why filters alone fail",
      "OWASP Top 10 for LLM applications",
      "Least-privilege tools and human approval steps",
      "PII detection and redaction",
      "Output validation and red-teaming"
    ],
    res: [
      ["OWASP Top 10 for LLM Applications", "https://genai.owasp.org/llm-top-10/", "article"],
      ["Prompt injection series (Simon Willison)", "https://simonwillison.net/series/prompt-injection/", "article"],
      ["The lethal trifecta for AI agents (Simon Willison)", "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/", "article"]
    ],
    tip: "Prompt injection ka koi pakka ilaaj nahi hai, isliye design se bachao: tools ko kam permission do, aur khatarnaak actions pe insaan se approval lo."
  },

  "llmops": {
    title: "LLMOps and production AI",
    subs: [
      "Tracing and observability with OpenTelemetry or Langfuse",
      "Exact and semantic caching",
      "Model routing and fallbacks",
      "Cost tracking per request, user and feature",
      "Prompt and config management across environments",
      "Streaming UX and latency budgets",
      "Feedback capture and the data flywheel",
      "Designing a generative AI platform end to end"
    ],
    res: [
      ["Building LLM applications for production (Chip Huyen)", "https://huyenchip.com/2023/04/11/llm-engineering.html", "article"],
      ["Building A Generative AI Platform (Chip Huyen)", "https://huyenchip.com/2024/07/25/genai-platform.html", "article"],
      ["Langfuse documentation", "https://langfuse.com/docs", "docs"],
      ["A Field Guide to Rapidly Improving AI Products (Hamel Husain)", "https://hamel.dev/blog/posts/field-guide/", "article"]
    ],
    tip: "'Building A Generative AI Platform' ko LLM system design ka cheat sheet samjho. Har component ke liye socho: tumhare project mein ye kahan hai?"
  },

  "ai-app-frontend": {
    title: "Frontends for AI apps",
    subs: [
      "Rapid prototypes with Streamlit or Gradio",
      "Streaming tokens to the browser with Server-Sent Events",
      "Chat UI patterns: history, retries, citations, feedback buttons",
      "Next.js with the Vercel AI SDK",
      "Loading, error and partial-result states"
    ],
    res: [
      ["Streamlit documentation", "https://docs.streamlit.io/", "docs"],
      ["Gradio quickstart", "https://www.gradio.app/guides/quickstart", "docs"],
      ["AI SDK documentation (Vercel)", "https://ai-sdk.dev/docs/introduction", "docs"]
    ],
    tip: "Demo ke liye Streamlit kaafi hai, par ek baar streaming wala proper web UI bhi banao. Users ko latency UI se hi mehsoos hoti hai."
  },

  "ai-product": {
    title: "AI product thinking",
    subs: [
      "Picking use cases where AI clearly beats rules or people",
      "Designing for model uncertainty and errors",
      "Human in the loop and graceful fallbacks",
      "Measuring ROI: time saved, accuracy, adoption",
      "Build vs buy vs fine-tune decisions"
    ],
    res: [
      ["People + AI Guidebook (Google PAIR)", "https://pair.withgoogle.com/guidebook/", "article"],
      ["Identifying and scaling AI use cases (OpenAI)", "https://cdn.openai.com/business-guides-and-resources/identifying-and-scaling-ai-use-cases.pdf", "article"]
    ],
    tip: "Har AI feature ke liye pehle likho: model galat ho to user ke saath kya hoga? Is sawaal ka achha jawaab hi achha product hai."
  }
});
