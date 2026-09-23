/*
  Roadmap format:
    RM.addRoadmap({
      id, code, title, color, colorDark, summary,
      phases: [{ title, note, topics: ["topic-id", ...], projects: [{ id, title, brief, done: ["criterion", ...] }] }]
    });
  Topic ids come from data/topics/*.js. Project ids must be unique across all roadmaps.
*/
RM.addRoadmap({
  id: "data-scientist",
  code: "DS",
  title: "Data Scientist",
  color: "#12806A",
  colorDark: "#3CC7A1",
  summary: "Turns data into decisions: asks the right question, measures it correctly, models when it helps, and explains the answer so people act on it.",
  phases: [
    {
      title: "Start here",
      note: "Pehle system, phir syllabus. Is phase ko ek hafte mein khatam karo: schedule fix karo, notes setup karo, aur jo pehle se aata hai use calibration mode mein honestly mark karo.",
      topics: ["learning-system", "role-ds"]
    },
    {
      title: "Programming foundations",
      note: "Python itna comfortable ho jaaye ki syntax ke baare mein sochna na pade. Terminal aur Git roz ke auzaar ban jaayein.",
      topics: ["py-core", "cli-linux", "git"],
      projects: [{
        id: "ds-data-quality-cli",
        title: "Data quality CLI",
        brief: "A command-line tool that takes any CSV and prints a data quality report: row counts, types, missingness, duplicates and suspicious values.",
        done: [
          "Runs as a single command on any CSV file",
          "Handles bad encodings and empty files without crashing",
          "At least five pytest tests",
          "README with an example report",
          "On GitHub with a clean commit history"
        ]
      }]
    },
    {
      title: "Math for data science",
      note: "Maths se daro mat, par isme atko bhi mat. Intuition, ek derivation aur code, itna kaafi hai aage badhne ke liye. Baaki depth zaroorat padne par wapas aake lo.",
      topics: ["linalg", "calculus", "probability"],
      projects: [{
        id: "ds-pca-first-principles",
        title: "PCA from first principles",
        brief: "Derive PCA on paper, then implement it in NumPy two ways and check yourself against scikit-learn.",
        done: [
          "Derivation written out: PCA as variance maximization",
          "NumPy version using eigendecomposition of the covariance matrix",
          "NumPy version using SVD, matching scikit-learn up to sign",
          "Explained-variance plot on a real dataset",
          "A five-sentence plain-language explanation of what PCA does"
        ]
      }]
    },
    {
      title: "Statistics",
      note: "Ye phase DS ki reedh ki haddi hai. Formula yaad karne se zyada simulation se khud prove karo. Interview mein confidence yahin se aata hai.",
      topics: ["stats-descriptive", "stats-inference", "regression-analysis", "bayesian"],
      projects: [{
        id: "ds-stats-by-simulation",
        title: "Statistics by simulation",
        brief: "One notebook that proves the core results of statistics to you by simulation instead of by faith.",
        done: [
          "Central limit theorem shown from a skewed distribution",
          "95% confidence interval coverage checked over 10,000 simulated samples",
          "p-values shown to be uniform when the null hypothesis is true",
          "Power vs sample size curve for a two-sample test",
          "Bootstrap interval compared with the analytic interval"
        ]
      }]
    },
    {
      title: "Data wrangling and SQL",
      note: "SQL roz practice karo, 2 se 3 questions. Same sawaal pandas aur SQL dono mein solve karke dekho, dono ki soch pakki hogi.",
      topics: ["numpy", "pandas", "data-collection", "sql-fundamentals", "sql-advanced", "db-fundamentals"],
      projects: [{
        id: "ds-analytics-sql",
        title: "Analytics SQL portfolio",
        brief: "Load a public e-commerce or event dataset into Postgres or DuckDB and answer 20 business questions in SQL.",
        done: [
          "Dataset loaded with a documented schema",
          "Queries for funnel, retention cohorts, repeat purchase and top-N per group",
          "Every query states its grain and handles NULLs correctly",
          "Five of the answers reproduced in pandas",
          "Queries and results published in a repo"
        ]
      }]
    },
    {
      title: "Analysis, visualization and communication",
      note: "Analysis tab tak adhoori hai jab tak kisi ne us par decision na liya. Har chart ek sawaal ka jawaab de, aur har memo pehli line mein jawaab de.",
      topics: ["eda", "dataviz", "storytelling", "bi-dashboards"],
      projects: [{
        id: "ds-analysis-decision",
        title: "An analysis that leads to a decision",
        brief: "Take a messy public dataset, find something that matters, and write it up for a busy decision-maker.",
        done: [
          "EDA notebook that documents data quality issues",
          "Three charts, one message each",
          "One-page memo: answer first, then evidence and caveats",
          "A small dashboard in Power BI or Streamlit",
          "Feedback collected from one non-technical reader"
        ]
      }]
    },
    {
      title: "Machine learning core",
      note: "Model banana aasaan hai, sahi evaluate karna mushkil. Baseline, leakage-free cross-validation aur error analysis pe zyada time do, naye algorithms pe kam.",
      topics: ["ml-foundations", "ml-algorithms", "ml-from-scratch", "sklearn", "feature-eng", "model-eval", "unsupervised", "interpretability"],
      projects: [{
        id: "ds-tabular-ml",
        title: "Tabular ML, done properly",
        brief: "An end-to-end tabular prediction project, for example a Kaggle Playground competition, done the way a senior would review it.",
        done: [
          "Simple baseline scored first",
          "Leakage-safe pipeline with cross-validation",
          "Gradient boosting model tuned with Optuna",
          "Error analysis by segment",
          "SHAP explanation of the top drivers",
          "Write-up comparing baseline and final model with honest caveats"
        ]
      }]
    },
    {
      title: "Experimentation, causality and product",
      note: "Yahi skills DS ko analyst se alag karti hain. Correlation se causation tak ka safar samjho, aur har experiment se pehle design likho.",
      topics: ["experimentation", "causal", "product-analytics"],
      projects: [{
        id: "ds-experiment-causal",
        title: "Experiment and causal analysis",
        brief: "Design, analyse and decide on an A/B test, then estimate a causal effect from observational data.",
        done: [
          "Pre-registration doc: hypothesis, metrics, minimum detectable effect, sample size",
          "Analysis with a sample ratio mismatch check, intervals and practical significance",
          "CUPED applied, with the variance reduction reported",
          "A difference-in-differences or matching analysis on a public dataset",
          "Decision memo: ship, iterate or stop, with reasoning"
        ]
      }]
    },
    {
      title: "Specialized modeling",
      note: "Sab kuch ek saath nahi. Jo tumhare domain aur target jobs mein chahiye, uspe pehle depth lo; baaki ki basic samajh kaafi hai.",
      topics: ["timeseries", "nlp-classical", "optimization-or", "recsys"],
      projects: [{
        id: "ds-forecast-or-optimize",
        title: "Forecast or optimize",
        brief: "Pick one: a demand forecast with proper backtesting, or an allocation problem solved with linear programming.",
        done: [
          "Naive and seasonal-naive baselines beaten, with numbers",
          "Rolling-origin backtest across several windows, or a validated optimal solution",
          "Uncertainty or sensitivity shown, not just a point answer",
          "Business translation: which action changes because of this"
        ]
      }]
    },
    {
      title: "Deep learning and LLM literacy",
      note: "Aaj ke DS ko LLMs ka practical use aana chahiye. Par hamesha baseline se compare karo, hype se nahi.",
      topics: ["dl-foundations", "pytorch", "transformers", "llm-fundamentals", "llm-apis"],
      projects: [{
        id: "ds-text-classic-vs-modern",
        title: "Text classification: classic vs modern",
        brief: "Solve one text classification task three ways and compare them like a data scientist, not a fan.",
        done: [
          "TF-IDF plus logistic regression baseline",
          "Fine-tuned small transformer",
          "LLM zero-shot and few-shot with structured output",
          "Comparison table: accuracy, cost, latency and effort"
        ]
      }]
    },
    {
      title: "Data at scale and production",
      note: "Model production tak na pahunche to value zero hai. Deployment ka basic khud karna aana chahiye; poora MLOps expert banna zaroori nahi.",
      topics: ["data-warehousing", "spark", "py-advanced", "apis-backend", "docker", "mlops-lifecycle", "data-ethics"],
      projects: [{
        id: "ds-ship-a-model",
        title: "Ship a model",
        brief: "Take your best model from the ML phase to a small, real production setup.",
        done: [
          "Training tracked in MLflow with a registered model",
          "FastAPI endpoint serving predictions from a Docker container",
          "Batch scoring job for a daily file",
          "Input validation and basic monitoring logs",
          "README that runs everything with one command"
        ]
      }]
    },
    {
      title: "Interviews and portfolio",
      note: "Ab tak ka sab kuch ek kahani mein jodo. Interview mein yahi projects tumhari taraf se baat karenge.",
      topics: ["interview-ds", "interview-behavioral", "portfolio", "dsa"],
      projects: [{
        id: "ds-capstone",
        title: "Capstone: a decision from data, end to end",
        brief: "One project that shows the full data science loop. Suggested data: public procurement and spending data such as usaspending.gov, where domain knowledge from work gives you an edge.",
        done: [
          "A real business question and a success metric",
          "Data pipeline in SQL with documented assumptions",
          "Analysis plus a model or an experiment design",
          "Dashboard for ongoing tracking",
          "Ten-slide readout and a public write-up"
        ]
      }]
    }
  ]
});
