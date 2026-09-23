/* Topic library: interviews and portfolio. Format is described in core.js. */
RM.addTopics({
  "interview-ds": {
    title: "Data scientist interview prep",
    subs: [
      "SQL rounds: timed practice on window functions and joins",
      "Probability and statistics question bank",
      "A/B testing and experiment design cases",
      "Product sense and metric diagnosis cases",
      "ML theory: bias-variance, regularization, trees, metrics",
      "Take-home assignments: structure, communication, time-boxing",
      "Walk through two portfolio projects end to end"
    ],
    res: [
      ["DataLemur: SQL, statistics and ML questions", "https://datalemur.com/", "practice"],
      ["Data science interview theory questions (Alexey Grigorev)", "https://github.com/alexeygrigorev/data-science-interviews", "repo"],
      ["Machine Learning Interviews (Chip Huyen)", "https://huyenchip.com/ml-interviews-book/", "book"]
    ],
    tip: "Har hafte ek mock interview karo, chahe akele camera ke saamne. Jawaab bolte waqt apna reasoning zor se bolo, interviewer wahi sunta hai."
  },

  "interview-mle": {
    title: "ML engineer interview prep",
    subs: [
      "Coding: medium-level DSA problems under time pressure",
      "ML coding: implement k-means, logistic regression, attention",
      "ML breadth: short, crisp answers across classical ML and deep learning",
      "ML depth: one area you can go very deep on",
      "ML system design: two full mock designs per week",
      "Infrastructure questions: serving, scaling, monitoring"
    ],
    res: [
      ["Machine Learning Interviews (Chip Huyen)", "https://huyenchip.com/ml-interviews-book/", "book"],
      ["Tech Interview Handbook", "https://www.techinterviewhandbook.org/", "article"],
      ["NeetCode roadmap", "https://neetcode.io/roadmap", "practice"]
    ],
    tip: "Ek 'depth' area chuno jahan tum 30 minute bina ruke baat kar sako. Baaki breadth ke liye crisp 2-line answers taiyaar rakho."
  },

  "interview-ai": {
    title: "AI engineer interview prep",
    subs: [
      "Coding round: Python, APIs, async, data handling",
      "LLM fundamentals: tokens, attention, sampling, fine-tuning",
      "Design a RAG system with evals and failure modes",
      "Design an agent with tools, guardrails and cost limits",
      "Debugging scenarios: hallucinations, bad retrieval, latency spikes",
      "Demo one shipped project with real metrics"
    ],
    res: [
      ["Building A Generative AI Platform (Chip Huyen)", "https://huyenchip.com/2024/07/25/genai-platform.html", "article"],
      ["What We Learned from a Year of Building with LLMs", "https://applied-llms.org/", "article"],
      ["Hugging Face LLM Course", "https://huggingface.co/learn/llm-course", "course"]
    ],
    tip: "AI interviews mein 'tumne kya ship kiya aur kaise measure kiya' sabse bada sawaal hai. Apne production projects ki story numbers ke saath taiyaar rakho."
  },

  "interview-fde": {
    title: "Forward deployed engineer interview prep",
    subs: [
      "Decomposition: break a vague customer problem into a plan",
      "Practical coding: build a working thing fast, then refine",
      "Re-engineering: read and extend an unfamiliar codebase",
      "Debugging a broken system under time pressure",
      "Customer role-play: discovery questions and pushback",
      "Stories: ambiguity, ownership, a customer you turned around"
    ],
    res: [
      ["What is a forward deployed engineer? See the interview process section (Paraform)", "https://www.paraform.com/insights/what-is-a-forward-deployed-engineer", "article"],
      ["Tech Interview Handbook: behavioral interviews", "https://www.techinterviewhandbook.org/behavioral-interview/", "article"]
    ],
    tip: "Decomposition round mein seedha solution pe mat kudo. Pehle clarifying questions, stakeholders aur success metric, phir plan."
  },

  "interview-behavioral": {
    title: "Behavioral interviews and your story",
    subs: [
      "STAR format, with answers under two minutes",
      "A story bank: impact, conflict, failure, ambiguity, leadership",
      "Quantifying impact with real numbers",
      "Your 60-second 'tell me about yourself'",
      "Good questions to ask interviewers"
    ],
    res: [
      ["Tech Interview Handbook: behavioral interviews", "https://www.techinterviewhandbook.org/behavioral-interview/", "article"]
    ],
    tip: "8 se 10 stories ek doc mein likh lo, har ek numbers ke saath. Zyadatar behavioral sawaal inhi stories se cover ho jaate hain."
  },

  "portfolio": {
    title: "Portfolio and public proof of work",
    subs: [
      "READMEs that explain problem, approach, results and trade-offs",
      "An architecture diagram and a short demo video or GIF",
      "One write-up per major project",
      "Pinned GitHub repos that match your target role",
      "Share progress publicly: short posts and write-ups"
    ],
    res: [
      ["Write the Docs: a beginner's guide to writing documentation", "https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/", "article"]
    ],
    tip: "Certificates se zyada proof of work bolta hai. Har project ke saath short write-up: problem, approach, numbers, aur kya seekha."
  }
});
