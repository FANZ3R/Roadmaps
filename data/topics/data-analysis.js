/* Topic library: data wrangling, SQL, analysis, communication, experimentation. Format is described in core.js. */
RM.addTopics({
  "numpy": {
    title: "NumPy",
    hi: ["CodeWithHarry: NumPy", "https://www.youtube.com/results?search_query=codewithharry+numpy+tutorial+hindi", "Ek baar dekh ke numpy-100 exercises karo"],
    subs: [
      "ndarrays, dtypes and memory layout",
      "Indexing, slicing, boolean masks, fancy indexing",
      "Broadcasting rules",
      "Vectorization instead of Python loops",
      "Aggregations along axes; reshape, stack, split",
      "Linear algebra routines and random number generation"
    ],
    res: [
      ["NumPy: the absolute basics for beginners", "https://numpy.org/doc/stable/user/absolute_beginners.html", "docs"],
      ["From Python to NumPy (Nicolas Rougier)", "https://www.labri.fr/perso/nrougier/from-python-to-numpy/", "book"],
      ["100 NumPy exercises", "https://github.com/rougier/numpy-100", "practice"]
    ],
    tip: "Broadcasting pe 20 minute extra do, baad mein pandas aur PyTorch dono mein kaam aayega. numpy-100 ke exercises daily warm-up ke liye best hain."
  },

  "pandas": {
    title: "pandas and data wrangling",
    hi: ["CodeWithHarry: Pandas", "https://www.youtube.com/results?search_query=codewithharry+pandas+tutorial+hindi", "Video ke baad Kaggle ke Pandas exercises zaroor karo"],
    subs: [
      "Series and DataFrames; reading CSV, Excel, Parquet and SQL",
      "Selecting with loc and iloc, filtering, sorting",
      "groupby: split-apply-combine, agg, transform",
      "Merging and joining; duplicate keys and join explosions",
      "Reshaping: pivot, pivot_table, melt, stack",
      "Missing data strategies",
      "Datetimes, resampling and rolling windows",
      "Method chaining; avoiding apply when vectorization works",
      "When to reach for Polars or DuckDB instead"
    ],
    res: [
      ["Python for Data Analysis, 3rd ed. (Wes McKinney)", "https://wesmckinney.com/book/", "book"],
      ["Kaggle Learn: Pandas", "https://www.kaggle.com/learn/pandas", "practice"],
      ["Polars user guide", "https://docs.pola.rs/", "docs"],
      ["DuckDB documentation", "https://duckdb.org/docs/", "docs"]
    ],
    tip: "Har pandas operation ka SQL equivalent socho, aur ulta bhi. groupby, merge aur pivot pe itna practice karo ki docs dekhne ki zaroorat na pade."
  },

  "data-collection": {
    title: "Collecting data: APIs, files and scraping",
    hi: ["CampusX: 100 Days of Machine Learning", "https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH", "Day 15 se 18: CSV, JSON, SQL, API aur web scraping"],
    subs: [
      "Calling REST APIs with requests: auth, pagination, rate limits",
      "Flattening JSON and nested data into tables",
      "Web scraping with Beautiful Soup; robots.txt and ethics",
      "Reading messy files: encodings, delimiters, Excel quirks",
      "Keeping raw data immutable and reproducible"
    ],
    res: [
      ["Requests documentation", "https://requests.readthedocs.io/", "docs"],
      ["Beautiful Soup documentation", "https://www.crummy.com/software/BeautifulSoup/bs4/doc/", "docs"],
      ["Automate the Boring Stuff: web scraping chapter", "https://automatetheboringstuff.com/", "book"]
    ],
    tip: "Real duniya ka data kabhi saaf nahi aata. Ek public API choose karo aur uska poora data pagination ke saath nikaalo, retries ke saath."
  },

  "sql-fundamentals": {
    title: "SQL fundamentals",
    hi: ["Apna College: SQL one shot", "https://www.youtube.com/results?search_query=apna+college+sql+one+shot", "Joins aur GROUP BY tak pakka karo, phir roz practice"],
    subs: [
      "SELECT, WHERE, ORDER BY, LIMIT",
      "Aggregates with GROUP BY and HAVING",
      "JOINs: inner, left, full, self; anti-join patterns",
      "Subqueries and CASE expressions",
      "NULL semantics and COALESCE",
      "UNION, INTERSECT, EXCEPT",
      "Creating tables and constraints; INSERT, UPDATE, DELETE"
    ],
    res: [
      ["SQLBolt (interactive)", "https://sqlbolt.com/", "practice"],
      ["Select Star SQL", "https://selectstarsql.com/", "book"],
      ["SQL Murder Mystery", "https://mystery.knightlab.com/", "practice"]
    ],
    tip: "SQLBolt do din ka kaam hai. Uske baad roz 2 se 3 questions ki aadat daalo, SQL speed se hi aati hai."
  },

  "sql-advanced": {
    title: "Analytical SQL",
    subs: [
      "Window functions: ROW_NUMBER, RANK, DENSE_RANK",
      "LAG and LEAD, running totals, moving averages",
      "CTEs and recursive CTEs",
      "Date and time manipulation; date spines",
      "Funnels, retention and cohort tables in SQL",
      "Top-N per group, deduplication, gaps and islands",
      "Sessionization from event logs",
      "Performance: EXPLAIN, indexes, avoiding accidental cross joins"
    ],
    res: [
      ["PostgreSQL Exercises", "https://pgexercises.com/", "practice"],
      ["DataLemur SQL interview questions", "https://datalemur.com/", "practice"],
      ["LeetCode Top SQL 50", "https://leetcode.com/studyplan/top-sql-50/", "practice"],
      ["PostgreSQL tutorial: window functions", "https://www.postgresql.org/docs/current/tutorial-window.html", "docs"]
    ],
    tip: "Window functions pe itni practice karo ki retention ya cohort query 10 minute mein likh do. DS aur analytics interviews ka pehla round yahi hota hai."
  },

  "eda": {
    title: "Exploratory data analysis",
    hi: ["CampusX: 100 Days of Machine Learning", "https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH", "Day 19 se 22: understanding data, univariate, bivariate analysis, pandas profiling"],
    subs: [
      "Profiling a new dataset: shape, types, ranges, cardinality",
      "Univariate distributions and outlier detection",
      "Missingness patterns and what they imply",
      "Bivariate and multivariate relationships",
      "Sanity checks against business reality",
      "Writing down hypotheses and findings as you go"
    ],
    res: [
      ["Python Data Science Handbook (Jake VanderPlas)", "https://jakevdp.github.io/PythonDataScienceHandbook/", "book"],
      ["R for Data Science: the exploratory analysis chapters (ideas transfer to Python)", "https://r4ds.hadley.nz/", "book"],
      ["Kaggle Learn: Data Visualization", "https://www.kaggle.com/learn/data-visualization", "practice"]
    ],
    tip: "EDA ka matlab 50 plots nahi. Pehle 3 sawaal likho jinka jawaab chahiye, phir sirf unke liye explore karo aur findings note karte jao."
  },

  "dataviz": {
    title: "Data visualization",
    subs: [
      "Choosing the right chart for the question",
      "Perception: position beats length beats area beats color",
      "The Matplotlib figure and axes API",
      "seaborn for statistical plots",
      "Plotly for interactive charts",
      "Color, accessibility, and honest axes",
      "Small multiples and annotation"
    ],
    res: [
      ["Fundamentals of Data Visualization (Claus Wilke)", "https://clauswilke.com/dataviz/", "book"],
      ["From Data to Viz", "https://www.data-to-viz.com/", "article"],
      ["Matplotlib tutorials", "https://matplotlib.org/stable/tutorials/index.html", "docs"]
    ],
    tip: "Har chart ka ek title likho jo conclusion bataye, sirf variable ka naam nahi. Wilke ki book ka 'principles' part zaroor padho."
  },

  "storytelling": {
    title: "Communicating analysis",
    subs: [
      "Start from the decision the audience has to make",
      "Answer first, then evidence (the pyramid principle)",
      "One message per chart and per slide",
      "Communicating uncertainty honestly",
      "Writing a one-page analysis memo",
      "Presenting to non-technical stakeholders"
    ],
    res: [
      ["Storytelling with Data blog", "https://www.storytellingwithdata.com/blog", "article"],
      ["Technical Writing One and Two (Google)", "https://developers.google.com/tech-writing", "course"]
    ],
    tip: "Analysis tab tak adhoori hai jab tak us par koi decision na le. Har memo ki pehli line mein jawaab do, detail baad mein."
  },

  "bi-dashboards": {
    title: "BI, dashboards and dimensional modeling",
    subs: [
      "Defining KPIs precisely: formula, grain, filters, owner",
      "Star schemas: facts, dimensions and grain",
      "Slowly changing dimensions",
      "Power BI: data model, relationships, DAX basics",
      "Dashboard design: hierarchy, filters, performance",
      "Refresh schedules, governance, one source of truth"
    ],
    res: [
      ["Kimball dimensional modeling techniques", "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", "article"],
      ["Power BI training (Microsoft Learn)", "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", "course"]
    ],
    tip: "Dashboard se pehle KPI ki exact definition likho: formula, grain, filter. Aadhe dashboard problems galat definitions se aate hain, galat charts se nahi."
  },

  "product-analytics": {
    title: "Product and business metrics",
    subs: [
      "North star metric and input metrics",
      "Funnels and conversion analysis",
      "Retention curves and cohorts",
      "Engagement: DAU/MAU, stickiness, frequency",
      "Unit economics: LTV, CAC, churn, gross margin",
      "Metric trees: diagnosing why a metric moved",
      "Guardrail metrics and Goodhart's law"
    ],
    res: [
      ["Every product needs a North Star metric (Amplitude)", "https://amplitude.com/blog/product-north-star-metric", "article"],
      ["North Star Playbook (Amplitude, free)", "https://www.amplitude.com/blog/introducing-north-star-playbook", "book"],
      ["A/B Testing by Google: choosing and characterizing metrics (Udacity)", "https://www.udacity.com/course/ab-testing--ud257", "course"]
    ],
    tip: "'Metric 10 percent gir gaya, kyun?' DS interviews ka favourite sawaal hai. Apna framework banao: data issue, seasonality, kaunsa segment, funnel ka kaunsa step."
  },

  "experimentation": {
    title: "A/B testing and experimentation",
    subs: [
      "Randomization units and assignment",
      "Choosing primary, secondary and guardrail metrics",
      "Sample size, power and minimum detectable effect",
      "Test duration, novelty and primacy effects",
      "The peeking problem and sequential testing",
      "Sample ratio mismatch checks",
      "Variance reduction with CUPED",
      "Interference, network effects and switchback tests",
      "Multi-armed bandits and when to prefer them"
    ],
    res: [
      ["A/B Testing by Google (Udacity, free)", "https://www.udacity.com/course/ab-testing--ud257", "course"],
      ["How Not To Run an A/B Test (Evan Miller)", "https://www.evanmiller.org/how-not-to-run-an-ab-test.html", "article"],
      ["Sample size calculator (Evan Miller)", "https://www.evanmiller.org/ab-testing/sample-size.html", "tool"],
      ["Causal Inference for the Brave and True: randomized experiments", "https://matheusfacure.github.io/python-causality-handbook/", "book"]
    ],
    tip: "Test chalane se pehle design likho: hypothesis, metric, MDE, sample size, duration. Baad mein number dekh ke design badalna hi sabse badi galti hai."
  },

  "causal": {
    title: "Causal inference",
    subs: [
      "Potential outcomes and the fundamental problem of causal inference",
      "Confounding, selection bias and causal graphs (DAGs)",
      "Why randomized experiments are the gold standard",
      "Matching and propensity scores",
      "Difference-in-differences",
      "Instrumental variables",
      "Regression discontinuity",
      "Synthetic control",
      "Heterogeneous effects and uplift modeling"
    ],
    res: [
      ["Causal Inference for the Brave and True (Matheus Facure)", "https://matheusfacure.github.io/python-causality-handbook/", "book"],
      ["Causal Inference: The Mixtape (Scott Cunningham)", "https://mixtape.scunning.com/", "book"],
      ["Introduction to Causal Inference (Brady Neal)", "https://www.bradyneal.com/causal-inference-course", "course"]
    ],
    tip: "Ye skill DS ko analyst se alag karti hai. Brave and True ka Python code saath-saath chalao, aur har method ke assumptions ek line mein likho."
  },

  "timeseries": {
    title: "Time series and forecasting",
    subs: [
      "Trend, seasonality and decomposition",
      "Stationarity, differencing, ACF and PACF",
      "Baselines first: naive, seasonal naive, moving average",
      "Exponential smoothing (ETS)",
      "ARIMA and SARIMA",
      "Machine learning forecasts with lag and rolling features",
      "Backtesting with time-based cross-validation",
      "Forecast metrics: MAE, RMSE, MAPE, MASE",
      "Hierarchical and intermittent demand forecasting"
    ],
    res: [
      ["Forecasting: Principles and Practice, 3rd ed. (Hyndman and Athanasopoulos)", "https://otexts.com/fpp3/", "book"],
      ["Kaggle Learn: Time Series", "https://www.kaggle.com/learn/time-series", "practice"],
      ["StatsForecast (Nixtla)", "https://github.com/Nixtla/statsforecast", "repo"]
    ],
    tip: "Book R mein hai par concepts universal hain; code StatsForecast mein karo. Naive baseline ko beat kiye bina koi model mat dikhana."
  },

  "optimization-or": {
    title: "Optimization and operations research",
    subs: [
      "Formulating problems: decision variables, objective, constraints",
      "Linear programming and the simplex idea",
      "Integer and mixed-integer programming",
      "Classic models: assignment, transportation, knapsack",
      "Solving with OR-Tools or PuLP",
      "Sensitivity analysis and explaining solutions to the business"
    ],
    res: [
      ["Google OR-Tools guides", "https://developers.google.com/optimization", "docs"],
      ["PuLP documentation", "https://coin-or.github.io/pulp/", "docs"]
    ],
    tip: "Procurement mein supplier allocation aur order sizing seedhe LP aur MIP problems hain. Prediction ke baad 'ab kya karein' ka jawaab yahin se aata hai."
  },

  "data-ethics": {
    title: "Data ethics, fairness and privacy",
    subs: [
      "Sources of bias: sampling, labels, measurement, feedback loops",
      "Fairness metrics and their trade-offs",
      "PII, anonymization and why re-identification happens",
      "Privacy law basics: GDPR and India's DPDP Act",
      "Model cards and datasheets for datasets"
    ],
    res: [
      ["Fairness and Machine Learning (Barocas, Hardt, Narayanan)", "https://fairmlbook.org/", "book"],
      ["GDPR.eu guides", "https://gdpr.eu/", "article"]
    ],
    tip: "Har project mein ek paragraph likho: kiske liye galat ho sakta hai, aur kaise pata chalega. Senior interviews mein ye soch alag dikhti hai."
  }
});
