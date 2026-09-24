/* Topic library: mathematics and statistics. Format is described in core.js. */
RM.addTopics({
  "linalg": {
    title: "Linear algebra",
    subs: [
      "Vectors: addition, scaling, dot product, norms, projections",
      "Matrices as linear transformations; matrix multiplication",
      "Linear systems, Gaussian elimination, rank and inverse",
      "Determinants as volume scaling",
      "Span, basis, independence, column space and null space",
      "Orthogonality, Gram-Schmidt, QR, least squares",
      "Eigenvalues, eigenvectors and diagonalization",
      "Singular value decomposition and low-rank approximation",
      "PCA derived from SVD and eigendecomposition"
    ],
    res: [
      ["Essence of Linear Algebra (3Blue1Brown)", "https://www.3blue1brown.com/topics/linear-algebra", "video"],
      ["MIT 18.06 Linear Algebra (Gilbert Strang)", "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", "course"],
      ["Mathematics for Machine Learning, ch. 2 to 4 and 10", "https://mml-book.github.io/", "book"],
      ["MIT 18.065 Matrix Methods in Data Analysis and ML", "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/", "course"]
    ],
    tip: "Pehle 3B1B se geometry ki intuition banao, phir Strang ke lectures aur problem sets se pakka karo. SVD ko PCA se jod ke samjho, ML mein sabse zyada yahi kaam aata hai."
  },

  "calculus": {
    title: "Calculus and optimization",
    subs: [
      "Limits, derivatives and the chain rule",
      "Partial derivatives, gradients, Jacobians and Hessians",
      "Matrix calculus: derivatives of vector and matrix expressions",
      "Taylor series and local approximations",
      "Integrals, and why they matter for probability densities",
      "Convex vs non-convex functions; local vs global minima",
      "Gradient descent, learning rate, momentum, Adam",
      "Constrained optimization and Lagrange multipliers (intuition)"
    ],
    res: [
      ["Essence of Calculus (3Blue1Brown)", "https://www.3blue1brown.com/topics/calculus", "video"],
      ["Multivariable calculus (Khan Academy)", "https://www.khanacademy.org/math/multivariable-calculus", "course"],
      ["The Matrix Calculus You Need for Deep Learning", "https://explained.ai/matrix-calculus/", "article"],
      ["Mathematics for Machine Learning, ch. 5 and 7", "https://mml-book.github.io/", "book"]
    ],
    tip: "Chain rule aur gradient ko itna clear karo ki backprop khud derive kar sako. Baaki calculus zaroorat padne par wapas aake lo."
  },

  "probability": {
    title: "Probability",
    hi: ["Krish Naik Hindi: Statistics for Data Science", "https://www.youtube.com/playlist?list=PLTDARY42LDV6YHSRo669_uDDGmUEmQnDJ", "Probability aur distributions wale videos; depth chahiye to Stat 110"],
    subs: [
      "Sample spaces, events, counting, conditional probability",
      "Independence and Bayes' theorem",
      "Random variables, expectation, variance, covariance",
      "Discrete distributions: Bernoulli, binomial, geometric, Poisson",
      "Continuous distributions: uniform, normal, exponential, beta",
      "Joint, marginal and conditional distributions",
      "Law of large numbers and the central limit theorem",
      "Maximum likelihood and MAP estimation",
      "Entropy, cross-entropy and KL divergence"
    ],
    res: [
      ["Harvard Stat 110 (Joe Blitzstein): lectures, book, problems", "https://projects.iq.harvard.edu/stat110", "course"],
      ["Probability for Computer Scientists (Stanford CS109)", "https://chrispiech.github.io/probabilityForComputerScientists/en/", "book"],
      ["Seeing Theory (visual probability)", "https://seeing-theory.brown.edu/", "article"],
      ["Visual Information Theory (Chris Olah)", "https://colah.github.io/posts/2015-09-Visual-Information/", "article"]
    ],
    tip: "Stat 110 ke problems hi asli practice hain. Har distribution ke saath ek real example jodo, jaise Poisson matlab ek ghante mein aane wale orders."
  },

  "stats-descriptive": {
    title: "Descriptive statistics and statistical thinking",
    hi: ["Krish Naik Hindi: Statistics for Data Science", "https://www.youtube.com/playlist?list=PLTDARY42LDV6YHSRo669_uDDGmUEmQnDJ", "Shuru ke descriptive statistics wale videos"],
    subs: [
      "Mean, median, mode, variance, standard deviation, quantiles",
      "Shapes of distributions: skew, heavy tails, outliers",
      "Correlation vs causation; Pearson vs Spearman",
      "Sampling, sampling bias and survivorship bias",
      "Simpson's paradox and confounding in aggregated data",
      "Base rates and the base rate fallacy"
    ],
    res: [
      ["Statistics and probability (Khan Academy)", "https://www.khanacademy.org/math/statistics-probability", "course"],
      ["OpenIntro Statistics", "https://www.openintro.org/book/os/", "book"],
      ["StatQuest video index", "https://statquest.org/video-index/", "video"]
    ],
    tip: "Ye basic lagta hai par interviews mein Simpson's paradox aur sampling bias pe hi log fasate hain. Har concept ka ek real-life example yaad rakho."
  },

  "stats-inference": {
    title: "Statistical inference and hypothesis testing",
    hi: ["Krish Naik Hindi: Statistics for Data Science", "https://www.youtube.com/playlist?list=PLTDARY42LDV6YHSRo669_uDDGmUEmQnDJ", "Hypothesis testing, p-value aur confidence interval wale videos"],
    subs: [
      "Sampling distributions and standard error",
      "Confidence intervals: building them and reading them correctly",
      "Hypothesis tests: null, alternative, p-values, alpha",
      "Type I and II errors, statistical power, effect size",
      "t-tests, z-tests, chi-square tests, ANOVA",
      "Non-parametric tests: Mann-Whitney, Wilcoxon",
      "Multiple comparisons: Bonferroni and false discovery rate",
      "Bootstrap and permutation tests"
    ],
    res: [
      ["OpenIntro Statistics, ch. 5 to 7", "https://www.openintro.org/book/os/", "book"],
      ["Think Stats, 3rd edition (Allen Downey)", "https://allendowney.github.io/ThinkStats/", "book"],
      ["StatQuest video index", "https://statquest.org/video-index/", "video"]
    ],
    tip: "Har test ko simulation se khud verify karo, jaise null sach ho to p-value uniform kyun hoti hai. DS interviews ka core yahi hai, aur confidence bhi yahin se aata hai."
  },

  "regression-analysis": {
    title: "Regression analysis (the statistical view)",
    hi: ["CampusX: 100 Days of Machine Learning", "https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH", "Linear regression, regression metrics aur regularization wale videos"],
    subs: [
      "Ordinary least squares and its assumptions",
      "Interpreting coefficients, standard errors and intervals",
      "R-squared, adjusted R-squared and residual diagnostics",
      "Multicollinearity, heteroscedasticity, influential points",
      "Categorical variables, interactions and non-linear terms",
      "Logistic regression and odds ratios",
      "Generalized linear models: Poisson regression",
      "statsmodels for inference vs scikit-learn for prediction"
    ],
    res: [
      ["An Introduction to Statistical Learning (ISLP), ch. 3 and 4", "https://www.statlearning.com/", "book"],
      ["statsmodels documentation", "https://www.statsmodels.org/stable/index.html", "docs"]
    ],
    tip: "Coefficient ka matlab business language mein bolna practice karo: 'baaki sab same rahe to X badhne se Y itna badhta hai'. Interviewers yahi sunna chahte hain."
  },

  "bayesian": {
    title: "Bayesian statistics",
    subs: [
      "Prior, likelihood, posterior: updating beliefs",
      "Conjugate priors: beta-binomial, normal-normal",
      "Credible intervals vs confidence intervals",
      "Bayesian A/B testing",
      "MCMC intuition and PyMC basics",
      "Hierarchical models and partial pooling"
    ],
    res: [
      ["Think Bayes 2 (Allen Downey)", "https://allendowney.github.io/ThinkBayes2/", "book"],
      ["Statistical Rethinking lectures (Richard McElreath)", "https://github.com/rmcelreath/stat_rethinking_2024", "course"],
      ["Bayesian Methods for Hackers", "https://github.com/CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers", "book"]
    ],
    tip: "Beta-binomial se shuru karo, conversion rate ka posterior khud plot karo. McElreath ke lectures sochne ka tareeka badal dete hain."
  }
});
