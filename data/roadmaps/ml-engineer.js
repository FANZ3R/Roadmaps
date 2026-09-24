/* ML Engineer roadmap. Format is described in data-scientist.js. */
RM.addRoadmap({
  id: "ml-engineer",
  code: "MLE",
  title: "ML Engineer",
  color: "#2257C9",
  colorDark: "#7FA6F5",
  summary: "Builds the systems that train, ship and run models reliably: strong software engineering, real ML depth, and the infrastructure around both.",
  phases: [
    {
      title: "Start here",
      note: "Pehle system, phir syllabus. Jo pehle se aata hai use calibration mode mein mark karo, taaki roadmap tumhare asli level se shuru ho.",
      topics: ["learning-system", "role-mle"]
    },
    {
      title: "Software engineering foundations",
      note: "MLE pehle engineer hai, phir ML wala. Clean, tested, typed code likhne ki aadat abhi daalo, baad mein har phase mein kaam aayegi.",
      topics: ["py-core", "py-advanced", "cli-linux", "git", "sw-design", "testing"],
      projects: [{
        id: "mle-python-package",
        title: "A production-quality Python package",
        brief: "Build a small library, for example a feature engineering toolkit, the way a senior engineer would ship it.",
        done: [
          "Typed code that passes mypy or pyright",
          "pytest suite with fixtures and over 80% coverage",
          "ruff linting and pre-commit hooks",
          "GitHub Actions running tests on every push",
          "Installable with pip and published to TestPyPI"
        ]
      }]
    },
    {
      title: "CS fundamentals and DSA",
      note: "DSA roz thoda thoda, ek saath bahut nahi. OS aur networking clear hoga to production bugs samajhna aasaan ho jaayega.",
      topics: ["dsa", "os", "db-fundamentals"],
      extra: ["networking"],
      projects: [{
        id: "mle-kv-store",
        title: "Mini key-value store",
        brief: "A tiny key-value database with an HTTP API that makes OS, storage and networking concepts concrete.",
        done: [
          "GET, PUT and DELETE over HTTP",
          "Append-only log on disk, rebuilt on restart",
          "Concurrent clients handled safely",
          "Benchmark of reads and writes with latency percentiles",
          "Short write-up on what you learned about fsync and locking"
        ]
      }]
    },
    {
      title: "Math for ML",
      note: "Linear algebra aur calculus utna hi jitna backprop aur optimizers derive karne ke liye chahiye. Probability ko loss functions se jod ke samjho.",
      topics: ["linalg", "calculus", "probability"],
      extra: ["stats-inference"],
      projects: [{
        id: "mle-optimizers",
        title: "Optimizers from scratch",
        brief: "Implement and visualize optimization algorithms on classic test functions.",
        done: [
          "SGD, momentum, RMSProp and Adam implemented in NumPy",
          "Trajectories plotted on the Rosenbrock function",
          "Effect of learning rate shown with a small grid",
          "Gradients verified numerically with finite differences"
        ]
      }]
    },
    {
      title: "Classical machine learning",
      note: "Har algorithm ko teen level pe jaano: intuition, math, aur code. Interviews mein breadth yahin se aati hai.",
      topics: ["ml-foundations", "ml-algorithms", "ml-from-scratch", "sklearn", "feature-eng", "model-eval", "unsupervised"],
      extra: ["ml-theory"],
      projects: [{
        id: "mle-ml-library",
        title: "Your own mini scikit-learn",
        brief: "A small ML library written from scratch, tested against the real thing.",
        done: [
          "Linear and logistic regression, decision tree, k-means and PCA",
          "One consistent fit and predict API",
          "Tests that compare outputs with scikit-learn on the same data",
          "README with the time complexity of each algorithm"
        ]
      }]
    },
    {
      title: "Deep learning",
      note: "Karpathy ke saath code likho, aur ek clean training setup banao jise har project mein reuse karo.",
      topics: ["dl-foundations", "pytorch", "dl-practical", "cnn-cv", "transformers"],
      extra: ["seq-models"],
      projects: [{
        id: "mle-training-framework",
        title: "A training setup you would trust at work",
        brief: "Train an image classifier on CIFAR-10 with a training framework you would be happy to reuse.",
        done: [
          "Over 90% test accuracy on CIFAR-10",
          "Config-driven, seeded and reproducible runs",
          "Mixed precision, checkpointing and resume",
          "Experiments logged to MLflow or Weights and Biases",
          "Ablation table of three choices that mattered"
        ]
      }]
    },
    {
      title: "Modern models: LLMs and beyond",
      note: "Ek model khud train karo aur ek existing model ko adapt karo. Dono karne ke baad LLMs magic nahi lagenge.",
      topics: ["llm-fundamentals", "llm-from-scratch", "fine-tuning", "recsys"],
      extra: ["generative-models"],
      projects: [{
        id: "mle-pretrain-finetune",
        title: "Pretrain small, fine-tune big",
        brief: "Understand models by building one yourself and adapting an existing one.",
        done: [
          "A small GPT trained from scratch on a custom corpus",
          "A 1 to 3B open model fine-tuned with LoRA or QLoRA for a narrow task",
          "Fine-tuned vs base vs prompted model compared on one eval set",
          "Memory and throughput recorded for every run"
        ]
      }]
    },
    {
      title: "Data engineering for ML",
      note: "Model ki quality data pipeline se aati hai. Point-in-time correctness aur validation ko halke mein mat lena.",
      topics: ["sql-fundamentals", "sql-advanced", "data-eng-fundamentals", "spark", "streaming", "data-for-ml"],
      projects: [{
        id: "mle-feature-pipeline",
        title: "Feature pipeline",
        brief: "Batch and streaming features for one model, with point-in-time correct training data.",
        done: [
          "Batch features computed with Spark or DuckDB on a schedule",
          "A streaming feature computed from Kafka events",
          "Point-in-time correct training set generation",
          "Online and offline store with Feast",
          "Validation checks that fail the pipeline on bad data"
        ]
      }]
    },
    {
      title: "MLOps and deployment",
      note: "Yahi phase MLE ko DS se alag karta hai. Har cheez automate karo: training, deployment, monitoring.",
      topics: ["docker", "kubernetes", "cloud-fundamentals", "cicd", "mlops-lifecycle", "model-serving", "ml-monitoring"],
      extra: ["iac", "experimentation"],
      projects: [{
        id: "mle-mini-platform",
        title: "Mini ML platform",
        brief: "The full loop from training to monitored serving, automated end to end.",
        done: [
          "Training pipeline orchestrated with Airflow or Prefect",
          "Models versioned in an MLflow registry",
          "Service deployed on Kubernetes (kind or minikube is fine)",
          "CI/CD that builds, tests and deploys on merge",
          "Drift monitoring dashboard with an alert",
          "Canary or shadow rollout of a new model version"
        ]
      }]
    },
    {
      title: "Performance and scale",
      note: "Har optimization ko number se prove karo: latency, throughput, cost, quality. 'Fast lag raha hai' koi metric nahi.",
      topics: ["efficient-inference", "llm-inference"],
      extra: ["gpu-performance", "distributed-training"],
      projects: [{
        id: "mle-fast-and-cheap",
        title: "Make it fast and cheap",
        brief: "Optimize a model's inference and prove every gain with numbers.",
        done: [
          "Baseline p50 and p95 latency and throughput measured",
          "ONNX or quantized version with the quality change measured",
          "Dynamic batching added",
          "An open LLM served with vLLM and load-tested",
          "Cost per 1,000 requests before and after"
        ]
      }]
    },
    {
      title: "System design and interviews",
      note: "ML system design ko ek fixed structure mein bolna practice karo. Har hafte do mock designs, zor se bolke.",
      topics: ["system-design", "ml-system-design", "interview-mle", "interview-behavioral", "portfolio"],
      projects: [{
        id: "mle-capstone",
        title: "Capstone: a two-stage ranking system",
        brief: "An end-to-end recommender or search ranking system you can defend in an ML system design interview.",
        done: [
          "Candidate retrieval with embeddings plus a learned ranker",
          "Offline evaluation with NDCG and recall@k",
          "Online serving within a stated latency budget",
          "Monitoring and a retraining plan",
          "Design doc covering trade-offs and alternatives"
        ]
      }]
    }
  ]
});
