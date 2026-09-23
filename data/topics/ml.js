/* Topic library: classical machine learning. Format is described in core.js. */
RM.addTopics({
  "ml-foundations": {
    title: "Machine learning foundations",
    subs: [
      "Supervised, unsupervised, self-supervised and reinforcement learning",
      "Train, validation and test splits",
      "Loss functions and empirical risk minimization",
      "Gradient descent for linear and logistic regression",
      "Bias-variance trade-off, overfitting and underfitting",
      "Regularization: L1, L2, early stopping",
      "Data leakage and how it sneaks in",
      "Baselines and the ML project workflow"
    ],
    res: [
      ["Machine Learning Specialization (Andrew Ng, free to audit)", "https://www.coursera.org/specializations/machine-learning-introduction", "course"],
      ["Machine Learning Crash Course (Google)", "https://developers.google.com/machine-learning/crash-course", "course"],
      ["An Introduction to Statistical Learning (ISLP)", "https://www.statlearning.com/", "book"]
    ],
    tip: "Leakage aur bias-variance ko itna samjho ki kisi bhi project mein turant pakad sako. Algorithms baad mein, ye soch pehle."
  },

  "ml-algorithms": {
    title: "Core supervised learning algorithms",
    subs: [
      "Linear and logistic regression",
      "k-nearest neighbours and the curse of dimensionality",
      "Naive Bayes",
      "Support vector machines and the kernel trick",
      "Decision trees: splits, impurity, pruning",
      "Bagging and random forests",
      "Gradient boosting: XGBoost, LightGBM, CatBoost",
      "Choosing an algorithm for tabular, text and image data"
    ],
    res: [
      ["An Introduction to Statistical Learning (ISLP), ch. 4 to 9", "https://www.statlearning.com/", "book"],
      ["StatQuest video index", "https://statquest.org/video-index/", "video"],
      ["Stanford CS229 lecture notes", "https://cs229.stanford.edu/main_notes.pdf", "book"],
      ["Introduction to boosted trees (XGBoost docs)", "https://xgboost.readthedocs.io/en/stable/tutorials/model.html", "docs"]
    ],
    tip: "Har algorithm ke liye teen cheezein likho: kaise seekhta hai, kab fail hota hai, kaunse hyperparameters matter karte hain. Tabular data pe gradient boosting ko sabse gehraai se samjho."
  },

  "ml-from-scratch": {
    title: "Implement ML from scratch (NumPy only)",
    subs: [
      "Linear regression: normal equation and gradient descent",
      "Logistic regression with cross-entropy loss",
      "k-means clustering",
      "A decision tree classifier",
      "PCA via SVD",
      "A two-layer neural network with hand-written backprop",
      "Compare every implementation against scikit-learn"
    ],
    res: [
      ["ML-From-Scratch (Erik Linder-Noren)", "https://github.com/eriklindernoren/ML-From-Scratch", "repo"],
      ["micrograd (Andrej Karpathy)", "https://github.com/karpathy/micrograd", "repo"]
    ],
    tip: "Pehle math khud derive karo, phir code, phir sklearn se result match karo. 'Implement from scratch' wale interview rounds isi se nikalte hain."
  },

  "sklearn": {
    title: "scikit-learn in practice",
    subs: [
      "The estimator API: fit, predict, transform",
      "Pipelines and ColumnTransformer",
      "cross_val_score and cross_validate",
      "Hyperparameter search: GridSearchCV and RandomizedSearchCV",
      "Writing a custom transformer",
      "Persisting and versioning models"
    ],
    res: [
      ["scikit-learn MOOC (Inria)", "https://inria.github.io/scikit-learn-mooc/", "course"],
      ["scikit-learn user guide", "https://scikit-learn.org/stable/user_guide.html", "docs"]
    ],
    tip: "Inria ka MOOC official maintainers ne banaya hai, best practices wahi se seekho. Pipeline ke bina koi model mat banao, leakage apne aap kam ho jaata hai."
  },

  "feature-eng": {
    title: "Feature engineering",
    subs: [
      "Scaling and normalization: when it matters and when it does not",
      "Encoding categoricals: one-hot, ordinal, target encoding",
      "Imputation strategies and missing-value indicators",
      "Datetime, cyclical and aggregate features",
      "Text features: bag of words and TF-IDF",
      "Interactions and binning",
      "Feature selection: filter, wrapper, embedded methods",
      "Leakage-safe feature pipelines"
    ],
    res: [
      ["Kaggle Learn: Feature Engineering", "https://www.kaggle.com/learn/feature-engineering", "practice"],
      ["Feature Engineering and Selection (Kuhn and Johnson)", "https://bookdown.org/max/FES/", "book"],
      ["scikit-learn: preprocessing data", "https://scikit-learn.org/stable/modules/preprocessing.html", "docs"]
    ],
    tip: "Domain knowledge se bane features aksar model change karne se zyada fayda dete hain. Target encoding hamesha CV ke andar karo."
  },

  "model-eval": {
    title: "Model evaluation and selection",
    subs: [
      "Cross-validation: k-fold, stratified, group, time series splits",
      "Classification metrics: precision, recall, F1, confusion matrix",
      "ROC-AUC vs PR-AUC, and log loss",
      "Choosing a decision threshold from business costs",
      "Probability calibration",
      "Regression metrics: MAE, RMSE, MAPE, R-squared",
      "Imbalanced data: resampling, class weights, the right metric",
      "Hyperparameter tuning with Optuna",
      "Error analysis: slicing errors to decide what to fix next"
    ],
    res: [
      ["scikit-learn: metrics and scoring", "https://scikit-learn.org/stable/modules/model_evaluation.html", "docs"],
      ["scikit-learn: cross-validation", "https://scikit-learn.org/stable/modules/cross_validation.html", "docs"],
      ["Machine Learning Crash Course (Google)", "https://developers.google.com/machine-learning/crash-course", "course"],
      ["Optuna documentation", "https://optuna.readthedocs.io/", "docs"]
    ],
    tip: "Metric business se chuno, library ke default se nahi. Har project mein error analysis ka ek table banao: kahan galat, kitna, kyun."
  },

  "unsupervised": {
    title: "Unsupervised learning",
    subs: [
      "k-means and choosing k",
      "Hierarchical clustering",
      "DBSCAN and density-based clustering",
      "Gaussian mixture models and the EM algorithm",
      "PCA for compression and visualization",
      "t-SNE and UMAP, and how not to misread them",
      "Anomaly detection: isolation forest, robust statistics",
      "Evaluating clusters: silhouette score and business sense"
    ],
    res: [
      ["scikit-learn: unsupervised learning", "https://scikit-learn.org/stable/unsupervised_learning.html", "docs"],
      ["An Introduction to Statistical Learning (ISLP), ch. 12", "https://www.statlearning.com/", "book"],
      ["How to Use t-SNE Effectively (Distill)", "https://distill.pub/2016/misread-tsne/", "article"]
    ],
    tip: "Clustering ka result tabhi kaam ka hai jab business wala usse koi action le sake. Har cluster ko ek naam aur ek action do."
  },

  "interpretability": {
    title: "Model interpretability",
    subs: [
      "Global vs local explanations",
      "Impurity vs permutation feature importance",
      "Partial dependence and ICE plots",
      "SHAP values: intuition and pitfalls",
      "LIME and counterfactual explanations",
      "Explaining model behaviour to stakeholders"
    ],
    res: [
      ["Interpretable Machine Learning (Christoph Molnar)", "https://christophm.github.io/interpretable-ml-book/", "book"],
      ["SHAP documentation", "https://shap.readthedocs.io/", "docs"]
    ],
    tip: "SHAP plot dikhana easy hai, uska sahi matlab batana mushkil. Correlated features pe explanations kaise bigadte hain, woh zaroor samjho."
  },

  "ml-theory": {
    title: "Deeper ML theory",
    subs: [
      "Losses as maximum likelihood: MSE and cross-entropy",
      "Generative vs discriminative models",
      "Deriving the bias-variance decomposition",
      "Kernel methods",
      "The EM algorithm, derived",
      "Generalization: VC dimension and PAC intuition",
      "Why bagging and boosting work"
    ],
    res: [
      ["Stanford CS229: Machine Learning", "https://cs229.stanford.edu/", "course"],
      ["Pattern Recognition and Machine Learning (Bishop), free PDF", "https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/", "book"],
      ["The Elements of Statistical Learning", "https://hastie.su.domains/ElemStatLearn/", "book"]
    ],
    tip: "CS229 ke notes ke derivations paper pe khud karo. MLE interviews ke depth rounds mein yahi 'kyun' wale sawaal aate hain."
  },

  "recsys": {
    title: "Recommender systems",
    subs: [
      "Content-based vs collaborative filtering",
      "Matrix factorization and ALS",
      "Implicit feedback and negative sampling",
      "Two-stage systems: candidate retrieval, then ranking",
      "Two-tower models and embedding retrieval",
      "Ranking metrics: precision@k, recall@k, MAP, NDCG",
      "Cold start, popularity bias and feedback loops"
    ],
    res: [
      ["Recommendation Systems course (Google)", "https://developers.google.com/machine-learning/recommendation", "course"],
      ["System design for recommendations and search (Eugene Yan)", "https://eugeneyan.com/writing/system-design-for-discovery/", "article"]
    ],
    tip: "Retrieval phir ranking wala two-stage pattern ML system design interviews mein baar baar aata hai. Eugene Yan ka article ek baar dhyan se padho."
  },

  "nlp-classical": {
    title: "NLP foundations",
    subs: [
      "Text preprocessing and tokenization",
      "Bag of words, n-grams and TF-IDF",
      "Word embeddings: word2vec and GloVe",
      "Text classification pipelines",
      "Sequence labeling and named entity recognition",
      "Topic modeling with LDA",
      "Language models, from n-grams to neural"
    ],
    res: [
      ["NLP Course For You (Lena Voita)", "https://lena-voita.github.io/nlp_course.html", "course"],
      ["Speech and Language Processing, 3rd ed. draft (Jurafsky and Martin)", "https://web.stanford.edu/~jurafsky/slp3/", "book"],
      ["The Illustrated Word2vec (Jay Alammar)", "https://jalammar.github.io/illustrated-word2vec/", "article"]
    ],
    tip: "LLMs ke zamane mein bhi TF-IDF plus logistic regression ek mazboot baseline hai. Lena Voita ka course visual aur crisp hai."
  },

  "ir-search": {
    title: "Information retrieval and search",
    subs: [
      "Inverted indexes and boolean retrieval",
      "TF-IDF and BM25 scoring",
      "Query processing: tokenization, stemming, synonyms",
      "Dense retrieval vs sparse retrieval",
      "Retrieval metrics: recall@k, MRR, NDCG",
      "Learning to rank basics"
    ],
    res: [
      ["Introduction to Information Retrieval (Manning, Raghavan, Schutze)", "https://nlp.stanford.edu/IR-book/", "book"],
      ["Pinecone Learn: search and vector database guides", "https://www.pinecone.io/learn/", "article"]
    ],
    tip: "RAG asal mein search problem hai. BM25 aur ranking metrics samajh liye to RAG debug karna bahut aasaan ho jaata hai."
  }
});
