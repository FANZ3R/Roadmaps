/* Topic library: backend, data engineering, infrastructure and MLOps. Format is described in core.js. */
RM.addTopics({
  "apis-backend": {
    title: "Backend and API development",
    subs: [
      "REST principles: resources, methods, status codes",
      "FastAPI: routing, Pydantic models, dependency injection",
      "Async endpoints and background tasks",
      "Auth: API keys, sessions, JWT, OAuth 2.0 flows",
      "Validation, error handling and consistent error formats",
      "Pagination, filtering and idempotency keys",
      "Databases from Python: SQLAlchemy and migrations",
      "API versioning and OpenAPI docs"
    ],
    res: [
      ["FastAPI tutorial", "https://fastapi.tiangolo.com/tutorial/", "docs"],
      ["Full Stack FastAPI template", "https://github.com/fastapi/full-stack-fastapi-template", "repo"],
      ["Google API Improvement Proposals (API design)", "https://google.aip.dev/", "article"],
      ["Designing robust APIs with idempotency (Stripe)", "https://stripe.com/blog/idempotency", "article"]
    ],
    tip: "FastAPI ka official tutorial shuru se end tak karo, woh khud mein ek course hai. Full Stack template padh ke dekho production project kaisa dikhta hai."
  },

  "system-design": {
    title: "System design fundamentals",
    subs: [
      "Latency vs throughput; back-of-envelope estimates",
      "Caching layers and invalidation strategies",
      "Load balancing and horizontal scaling",
      "SQL vs NoSQL, replication and sharding",
      "Consistency models and the CAP theorem",
      "Queues, pub/sub and async processing",
      "Rate limiting, retries with backoff, idempotency",
      "Designing for failure: timeouts and circuit breakers",
      "Classic designs: URL shortener, chat, news feed, notifications"
    ],
    res: [
      ["The System Design Primer", "https://github.com/donnemartin/system-design-primer", "repo"],
      ["ByteByteGo (YouTube)", "https://www.youtube.com/@ByteByteGo", "video"],
      ["MIT 6.5840 Distributed Systems", "https://pdos.csail.mit.edu/6.824/", "course"]
    ],
    tip: "Har design ko ek hi structure mein bolo: requirements, estimates, API, data model, high-level design, bottlenecks. Structure hi aadha score hai."
  },

  "data-eng-fundamentals": {
    title: "Data engineering fundamentals",
    subs: [
      "Batch vs streaming; ETL vs ELT",
      "Data lakes, warehouses and lakehouses",
      "File formats: CSV, JSON, Parquet, Avro; partitioning",
      "Orchestration with Airflow, Prefect or Dagster",
      "Idempotent pipelines, backfills and late-arriving data",
      "Data quality checks and data contracts",
      "Incremental loads and change data capture"
    ],
    res: [
      ["Data Engineering Zoomcamp (DataTalks.Club)", "https://github.com/DataTalksClub/data-engineering-zoomcamp", "course"],
      ["Start Data Engineering (blog)", "https://www.startdataengineering.com/", "article"],
      ["Apache Airflow documentation", "https://airflow.apache.org/docs/", "docs"]
    ],
    tip: "Pipeline ka sabse important gun idempotency hai: do baar chale to bhi result same. Har pipeline design karte waqt ye sawaal poocho."
  },

  "data-warehousing": {
    title: "Warehouses, OLAP and analytics engineering",
    subs: [
      "Columnar storage, and why OLAP queries are fast",
      "BigQuery, Snowflake and ClickHouse concepts",
      "Partitioning, clustering and cost control",
      "Materialized views and pre-aggregated tables",
      "dbt: models, refs, tests, docs, incremental models",
      "Semantic layers and shared metric definitions"
    ],
    res: [
      ["dbt documentation", "https://docs.getdbt.com/", "docs"],
      ["ClickHouse documentation", "https://clickhouse.com/docs", "docs"],
      ["BigQuery introduction", "https://cloud.google.com/bigquery/docs/introduction", "docs"]
    ],
    tip: "dbt ka free 'Fundamentals' course aur docs dono achhe hain. SQL ko version control aur tests ke saath likhna hi analytics engineering hai."
  },

  "spark": {
    title: "Big data processing with Spark",
    subs: [
      "Architecture: driver, executors, partitions",
      "Lazy evaluation, DAGs, transformations vs actions",
      "PySpark DataFrames and Spark SQL",
      "Shuffles, skew and broadcast joins",
      "Caching and persistence",
      "Reading the Spark UI to tune jobs"
    ],
    res: [
      ["Spark quick start", "https://spark.apache.org/docs/latest/quick-start.html", "docs"],
      ["PySpark getting started", "https://spark.apache.org/docs/latest/api/python/getting_started/index.html", "docs"],
      ["Data Engineering Zoomcamp: batch processing module", "https://github.com/DataTalksClub/data-engineering-zoomcamp", "course"]
    ],
    tip: "Local mode mein Spark chala ke Spark UI zaroor dekho. Shuffle aur skew samajh gaye to 80 percent tuning samajh gaye."
  },

  "streaming": {
    title: "Streaming and change data capture",
    subs: [
      "The log as a unifying abstraction",
      "Kafka: topics, partitions, consumer groups, offsets",
      "Delivery semantics: at most once, at least once, exactly once",
      "Change data capture with Debezium",
      "Stream processing: windows and watermarks",
      "Schema evolution and schema registries"
    ],
    res: [
      ["The Log: what every software engineer should know (Jay Kreps)", "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying", "article"],
      ["Confluent Developer courses (free)", "https://developer.confluent.io/courses/", "course"],
      ["Debezium tutorial", "https://debezium.io/documentation/reference/stable/tutorial.html", "docs"]
    ],
    tip: "Jay Kreps ka 'The Log' essay streaming ki neev hai, ek baar dhyan se padho. Exactly-once ka matlab aur uski keemat interviews mein poochi jaati hai."
  },

  "docker": {
    title: "Docker and containers",
    subs: [
      "Images vs containers; layers and build caching",
      "Writing Dockerfiles: slim bases, multi-stage builds",
      "Volumes, networking and port mapping",
      "docker compose for multi-service apps",
      "GPU containers with the NVIDIA container toolkit",
      "Registries, tagging and image scanning"
    ],
    res: [
      ["Docker: get started", "https://docs.docker.com/get-started/", "docs"],
      ["Docker Curriculum", "https://docker-curriculum.com/", "course"]
    ],
    tip: "Apni ek image ka size aadha karke dikhao: multi-stage build aur slim base se. Layer caching samajh gaye to build time bhi aadha."
  },

  "kubernetes": {
    title: "Kubernetes",
    subs: [
      "Pods, deployments and replica sets",
      "Services, ingress and DNS",
      "ConfigMaps and Secrets",
      "Resource requests, limits and autoscaling (HPA)",
      "Scheduling GPU workloads",
      "Helm charts basics",
      "Debugging: logs, describe, exec, events"
    ],
    res: [
      ["Kubernetes basics (official tutorial)", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "docs"],
      ["Killercoda Kubernetes playgrounds", "https://killercoda.com/", "practice"],
      ["Kubernetes The Hard Way", "https://github.com/kelseyhightower/kubernetes-the-hard-way", "repo"]
    ],
    tip: "kind ya minikube pe local cluster banao aur apni FastAPI app deploy karo. kubectl describe aur events padhna hi asli debugging hai."
  },

  "cloud-fundamentals": {
    title: "Cloud fundamentals (GCP and AWS)",
    subs: [
      "Regions, zones and the shared responsibility model",
      "Compute: VMs, spot instances, serverless containers and functions",
      "Storage: object storage, block storage, managed databases",
      "IAM: roles, service accounts, least privilege",
      "Networking: VPCs, subnets, firewalls, private access",
      "Secrets management",
      "Cost monitoring, budgets and alerts"
    ],
    res: [
      ["Google Cloud Skills Boost", "https://www.cloudskillsboost.google/", "course"],
      ["AWS Skill Builder (free digital courses)", "https://skillbuilder.aws/", "course"]
    ],
    tip: "Ek cloud gehraai se seekho, doosre ke concepts map ho jaate hain. Budget alert sabse pehle lagao, surprise bill se bachoge."
  },

  "iac": {
    title: "Infrastructure as code",
    subs: [
      "Why IaC: reproducibility, review, drift detection",
      "Terraform: providers, resources, variables, outputs",
      "State, remote backends and locking",
      "Modules and multiple environments",
      "Plan, apply and reviewing infrastructure changes in CI"
    ],
    res: [
      ["Terraform tutorials (HashiCorp)", "https://developer.hashicorp.com/terraform/tutorials", "course"]
    ],
    tip: "Jo infra tum console mein click karke banate ho, usi ko Terraform mein likho. Destroy karke dobara banao, tab bharosa aayega."
  },

  "cicd": {
    title: "CI/CD",
    subs: [
      "Pipeline stages: lint, test, build, deploy",
      "GitHub Actions: workflows, jobs, secrets, caching",
      "Building and pushing container images",
      "Deployment strategies: rolling, blue-green, canary",
      "Environment promotion and rollbacks"
    ],
    res: [
      ["GitHub Actions documentation", "https://docs.github.com/en/actions", "docs"],
      ["MLOps Zoomcamp: best practices module", "https://github.com/DataTalksClub/mlops-zoomcamp", "course"]
    ],
    tip: "Har project mein pehle din se CI lagao, chahe sirf lint aur tests ho. Baad mein lagana hamesha mushkil hota hai."
  },

  "mlops-lifecycle": {
    title: "MLOps lifecycle",
    subs: [
      "Scoping ML projects and defining success",
      "Experiment tracking and a model registry with MLflow",
      "Data and model versioning with DVC",
      "Reproducible training pipelines",
      "Continuous training and deployment for ML",
      "MLOps maturity levels",
      "Hidden technical debt in ML systems"
    ],
    res: [
      ["Made With ML (Goku Mohandas)", "https://madewithml.com/", "course"],
      ["MLOps Zoomcamp (DataTalks.Club)", "https://github.com/DataTalksClub/mlops-zoomcamp", "course"],
      ["MLOps: continuous delivery and automation pipelines (Google Cloud)", "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning", "article"],
      ["MLflow documentation", "https://mlflow.org/docs/latest/", "docs"]
    ],
    tip: "Made With ML ek hi project ko design se production tak le jaata hai, isliye poora follow karo. Tools badalte rehte hain, lifecycle wahi rehta hai."
  },

  "model-serving": {
    title: "Model serving and deployment",
    subs: [
      "Batch vs online vs streaming inference",
      "Serving a model behind a REST or gRPC API",
      "Serving frameworks: BentoML, Ray Serve, Triton",
      "Latency and throughput: dynamic batching",
      "Autoscaling and cold starts",
      "Shadow, canary and A/B model deployments",
      "Edge and on-device deployment basics"
    ],
    res: [
      ["Full Stack Deep Learning 2022", "https://fullstackdeeplearning.com/course/2022/", "course"],
      ["BentoML documentation", "https://docs.bentoml.com/", "docs"],
      ["Ray Serve documentation", "https://docs.ray.io/en/latest/serve/index.html", "docs"]
    ],
    tip: "Pehle poocho: prediction real-time chahiye bhi? Aadhe use cases batch se solve ho jaate hain, aur bahut sasta padta hai."
  },

  "ml-monitoring": {
    title: "ML monitoring and observability",
    subs: [
      "Logs, metrics and traces for ML services",
      "Data drift vs concept drift vs label shift",
      "Monitoring when labels are delayed or missing",
      "Prediction and feature distribution monitoring",
      "Alerting without alert fatigue",
      "Retraining triggers and feedback loops",
      "Prometheus and Grafana basics"
    ],
    res: [
      ["Data Distribution Shifts and Monitoring (Chip Huyen)", "https://huyenchip.com/2022/02/07/data-distribution-shifts-and-monitoring.html", "article"],
      ["Open-source ML observability course (Evidently AI)", "https://www.evidentlyai.com/ml-observability-course", "course"],
      ["Prometheus: getting started", "https://prometheus.io/docs/prometheus/latest/getting_started/", "docs"]
    ],
    tip: "Drift alert tabhi useful hai jab pata ho ki alert aane par karna kya hai. Har alert ke saath ek runbook line likho."
  },

  "data-for-ml": {
    title: "Data for ML systems",
    subs: [
      "Training-serving skew and how to prevent it",
      "Point-in-time correct training datasets",
      "Feature stores: offline vs online (Feast)",
      "Labeling pipelines and label quality",
      "Data validation with Great Expectations or Pandera",
      "Dataset versioning and lineage"
    ],
    res: [
      ["Stanford CS 329S: Machine Learning Systems Design", "https://stanford-cs329s.github.io/", "course"],
      ["Feast documentation", "https://docs.feast.dev/", "docs"],
      ["Pandera documentation", "https://pandera.readthedocs.io/", "docs"]
    ],
    tip: "Point-in-time correctness ek baar galat hua to model offline mein shaandaar aur production mein bekaar dikhega. Iska ek chhota example khud banao."
  },

  "ml-system-design": {
    title: "ML system design",
    subs: [
      "Framing: business objective to ML objective",
      "Offline metrics vs online metrics",
      "Data sources, labels and feedback loops",
      "Feature and model choices, with trade-offs",
      "Serving architecture, latency and cost",
      "Monitoring and the iteration plan",
      "Case studies: recommendations, search ranking, fraud, ads CTR",
      "LLM-era designs: RAG assistants, agents, moderation"
    ],
    res: [
      ["Machine Learning Interviews: ML system design chapters (Chip Huyen)", "https://huyenchip.com/ml-interviews-book/", "book"],
      ["ML system design: case studies from real companies (Evidently AI)", "https://www.evidentlyai.com/ml-system-design", "article"],
      ["Stanford CS 329S lecture notes", "https://stanford-cs329s.github.io/", "course"]
    ],
    tip: "Har hafte ek real company ka case study padho aur usse apne framework mein dobara likho. Do mock interviews har hafte, akele bolke bhi chalega."
  },

  "observability": {
    title: "Production debugging and observability",
    subs: [
      "Structured logging and correlation IDs",
      "Metrics, dashboards and SLOs",
      "Distributed tracing with OpenTelemetry",
      "A debugging method: reproduce, isolate, hypothesize, verify",
      "Reading stack traces and bisecting changes",
      "Incident response and blameless postmortems",
      "Writing runbooks"
    ],
    res: [
      ["Site Reliability Engineering (Google)", "https://sre.google/sre-book/table-of-contents/", "book"],
      ["The Site Reliability Workbook (Google)", "https://sre.google/workbook/table-of-contents/", "book"],
      ["OpenTelemetry documentation", "https://opentelemetry.io/docs/", "docs"]
    ],
    tip: "Debugging ek method hai, jaadu nahi. Agli baar bug aaye to hypothesis likh ke chalo aur dekho kitna jaldi pakad paate ho."
  }
});
