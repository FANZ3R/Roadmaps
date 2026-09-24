/* Topic library: forward deployed engineering, full stack, enterprise and customer-facing skills. Format is described in core.js. */
RM.addTopics({
  "fde-role": {
    title: "The forward deployed engineer role, clearly",
    subs: [
      "What FDEs do: embed with a customer, scope, build, deploy, iterate",
      "FDE vs software engineer vs solutions engineer vs consultant",
      "Palantir origins: Deltas and deployment strategists",
      "Why AI companies hire FDEs now: the last-mile deployment problem",
      "Traits that matter: ownership, speed, comfort with ambiguity, low ego",
      "Field to product: turning one-off work into reusable product",
      "Map 10 real job descriptions onto the phases of this roadmap"
    ],
    res: [
      ["Trading Margin for Moat: why the FDE is the hottest job in startups (a16z)", "https://a16z.com/services-led-growth/", "article"],
      ["Who wants to be a Delta? (Palantir)", "https://blog.palantir.com/who-wants-to-be-a-delta-8d2ea948035", "article"],
      ["What is a forward deployed engineer? (PostHog)", "https://posthog.com/blog/forward-deployed-engineer", "article"],
      ["Reflections on Palantir (Nabeel Qureshi)", "https://nabeelqu.co/reflections-on-palantir", "article"],
      ["What skills do you need to get an FDE job? (an analysis of real postings)", "https://vinvashishta.substack.com/p/what-skills-do-you-need-to-get-a", "article"]
    ],
    tip: "FDE matlab aadha engineer, aadha consultant. Coding strong honi chahiye, par customer ki asli problem samajh ke ship karna usse bhi zyada important hai."
  },

  "web-fundamentals": {
    title: "Web fundamentals: HTML, CSS, JavaScript",
    hi: ["Chai aur Code: JavaScript", "https://www.youtube.com/results?search_query=chai+aur+code+javascript+series", "HTML aur CSS ke basics ke baad JavaScript series"],
    subs: [
      "Semantic HTML and accessibility basics",
      "The CSS box model, flexbox, grid and responsive layouts",
      "JavaScript: types, functions, closures, modules",
      "The DOM and events",
      "Promises, async/await and fetch",
      "Browser devtools: network, console, performance"
    ],
    res: [
      ["The Odin Project: Foundations", "https://www.theodinproject.com/paths/foundations/courses/foundations", "course"],
      ["The Modern JavaScript Tutorial", "https://javascript.info/", "book"],
      ["MDN: Learn web development", "https://developer.mozilla.org/en-US/docs/Learn_web_development", "docs"]
    ],
    tip: "Python aata hai to JavaScript jaldi aayegi, bas async aur closures pe dhyan do. Chhoti cheezein banao: form, todo list, API se data dikhana."
  },

  "typescript": {
    title: "TypeScript",
    hi: ["Chai aur Code: TypeScript", "https://www.youtube.com/results?search_query=chai+aur+code+typescript", "Chhoti series; phir TypeScript Handbook"],
    subs: [
      "Basic and structural types; interfaces vs type aliases",
      "Unions, narrowing and discriminated unions",
      "Generics",
      "Typing API responses and validating them at runtime with zod",
      "tsconfig and strict mode"
    ],
    res: [
      ["The TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html", "docs"],
      ["Total TypeScript free tutorials", "https://www.totaltypescript.com/tutorials", "course"]
    ],
    tip: "Python ke type hints aur Pydantic jaisa hi hai, bas zyada strict. Strict mode on rakho shuru se."
  },

  "react-frontend": {
    title: "React and modern frontend",
    hi: ["Chai aur Code: React", "https://www.youtube.com/results?search_query=chai+aur+code+react+series", "Projects ke saath poori series"],
    subs: [
      "Components, props and state",
      "Hooks: useState, useEffect, useMemo, custom hooks",
      "Forms and controlled inputs",
      "Data fetching with loading and error states",
      "Routing and layouts with Next.js",
      "Server vs client components",
      "Styling with Tailwind CSS",
      "Auth and protected routes on the frontend"
    ],
    res: [
      ["React: Learn", "https://react.dev/learn", "docs"],
      ["Full Stack Open (University of Helsinki)", "https://fullstackopen.com/en/", "course"],
      ["Next.js Learn", "https://nextjs.org/learn", "course"]
    ],
    tip: "react.dev ka Learn section bahut achha likha hai, 'Thinking in React' zaroor padho. Full Stack Open ke exercises karoge to backend ke saath jodna bhi aa jaayega."
  },

  "auth-security": {
    title: "Authentication, authorization and app security",
    subs: [
      "Sessions vs tokens; JWT pitfalls",
      "OAuth 2.0 flows and OpenID Connect",
      "Enterprise SSO: SAML and OIDC with an identity provider",
      "Role-based and attribute-based access control",
      "OWASP Top 10: injection, broken access control, SSRF",
      "Secrets handling and key rotation",
      "Encryption in transit and at rest"
    ],
    res: [
      ["OAuth 2.0 Simplified (Aaron Parecki)", "https://www.oauth.com/", "book"],
      ["Web Security Academy (PortSwigger)", "https://portswigger.net/web-security", "course"],
      ["OWASP Top Ten", "https://owasp.org/www-project-top-ten/", "article"]
    ],
    tip: "Enterprise customer ka pehla sawaal hota hai: SSO hai? RBAC hai? Audit log hai? Inko pehle din se design mein rakho."
  },

  "compliance-privacy": {
    title: "Enterprise readiness: compliance and privacy",
    subs: [
      "SOC 2 and ISO 27001: what customers will ask for",
      "Security questionnaires and data processing agreements",
      "GDPR and India's DPDP Act basics",
      "Data residency, retention and deletion",
      "Audit logs and access reviews",
      "On-prem, VPC and air-gapped deployment models"
    ],
    res: [
      ["GDPR.eu guides", "https://gdpr.eu/", "article"],
      ["OWASP Application Security Verification Standard", "https://owasp.org/www-project-application-security-verification-standard/", "docs"]
    ],
    tip: "Lawyer banne ki zaroorat nahi. Bas itna jaano ki customer ka security team kya poochega, aur tumhara system uska jawaab kaise deta hai."
  },

  "enterprise-integration": {
    title: "Enterprise data integration",
    subs: [
      "Connecting to customer systems: REST, GraphQL, SOAP, SFTP, database replicas",
      "Webhooks, polling and incremental sync with cursors",
      "Rate limits, retries and idempotent writes",
      "Messy data: encodings, schema drift, duplicates",
      "Entity resolution and deduplication",
      "Integration patterns: messaging, routing, transformation",
      "ERP and CRM data models at a high level (SAP, Salesforce)"
    ],
    res: [
      ["Enterprise Integration Patterns", "https://www.enterpriseintegrationpatterns.com/", "book"],
      ["Splink: probabilistic record linkage", "https://moj-analytical-services.github.io/splink/", "docs"],
      ["Salesforce Trailhead (free)", "https://trailhead.salesforce.com/", "course"]
    ],
    tip: "FDE ka aadha time customer ke purane systems se data nikaalne mein jaata hai. Entity resolution ek baar achhe se seekh lo, har jagah kaam aayega."
  },

  "domain-modeling": {
    title: "Domain modeling and ontologies",
    subs: [
      "Finding entities, relationships and events from interviews",
      "Mapping messy source tables to a canonical model",
      "Ontology thinking: objects, links and actions",
      "Knowledge graphs, and when a graph database is worth it",
      "Cypher basics with Neo4j",
      "Domain-driven design: bounded contexts and ubiquitous language"
    ],
    res: [
      ["Neo4j GraphAcademy (free)", "https://graphacademy.neo4j.com/", "course"],
      ["Palantir Foundry: Ontology overview", "https://www.palantir.com/docs/foundry/ontology/overview/", "docs"],
      ["DDD Reference (Eric Evans)", "https://www.domainlanguage.com/ddd/reference/", "book"]
    ],
    tip: "Customer ki bhasha mein model banao, database ki bhasha mein nahi. Achha data model aadhe integration aur AI problems khud solve kar deta hai."
  },

  "customer-discovery": {
    title: "Customer discovery and scoping",
    subs: [
      "Stakeholder mapping: sponsor, users, blockers, IT",
      "Discovery interviews about past behaviour, not opinions",
      "Finding the real problem behind the requested feature",
      "Writing a problem statement with success metrics",
      "Scoping an MVP and fixing the appetite before work starts",
      "Handling scope creep and saying no clearly"
    ],
    res: [
      ["How to Talk to Users (Y Combinator)", "https://www.ycombinator.com/library/6g-how-to-talk-to-users", "video"],
      ["Shape Up (Basecamp): shaping and appetite", "https://basecamp.com/shapeup", "book"]
    ],
    tip: "Customer jo feature maangta hai woh aksar asli problem nahi hoti. 'Pichhli baar ye kab hua, tab aapne kya kiya?' jaise sawaal poocho."
  },

  "consulting-skills": {
    title: "Structured problem solving",
    subs: [
      "Hypothesis-driven problem solving",
      "Issue trees and MECE decomposition",
      "Estimation and sizing questions",
      "Prioritizing by impact vs effort",
      "Stakeholder updates, expectation setting and escalation",
      "Turning an ambiguous prompt into a technical plan"
    ],
    res: [
      ["How to master the seven-step problem-solving process (McKinsey)", "https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/how-to-master-the-seven-step-problem-solving-process", "article"],
      ["Shape Up (Basecamp)", "https://basecamp.com/shapeup", "book"]
    ],
    tip: "FDE interviews ka decomposition round isi skill ko test karta hai. Roz ek vague problem lo aur 10 minute mein usko issue tree mein todo."
  },

  "product-sense": {
    title: "Product thinking for engineers",
    subs: [
      "Users, jobs to be done and user journeys",
      "Prioritization frameworks like RICE, and their limits",
      "Writing a short PRD or PR/FAQ",
      "Measuring adoption and value after launch",
      "Build vs buy decisions",
      "Turning one-off customer work into reusable product"
    ],
    res: [
      ["Shape Up (Basecamp)", "https://basecamp.com/shapeup", "book"],
      ["Working Backwards: PR/FAQ resources", "https://workingbackwards.com/resources/working-backwards-pr-faq/", "article"]
    ],
    tip: "Kuch bhi banane se pehle ek paragraph likho: kaun use karega, kya badlega, kaise naapenge. Yahi aadat engineer ko product-minded banati hai."
  },

  "technical-writing": {
    title: "Technical writing and design docs",
    subs: [
      "Writing clearly: short sentences, active voice, one idea per paragraph",
      "Design docs: context, goals, non-goals, alternatives",
      "RFCs and architecture decision records",
      "Status updates that busy people actually read",
      "READMEs, runbooks and handover docs"
    ],
    res: [
      ["Technical Writing One and Two (Google)", "https://developers.google.com/tech-writing", "course"],
      ["Design Docs at Google (Malte Ubl)", "https://www.industrialempathy.com/posts/design-docs-at-google/", "article"],
      ["Write the Docs guide", "https://www.writethedocs.org/guide/", "article"]
    ],
    tip: "Google ke dono writing courses milake 4 se 5 ghante ke hain aur har email, doc aur PR description ko behtar bana dete hain."
  },

  "demos-presentations": {
    title: "Demos and presentations",
    subs: [
      "Structure: the problem, the moment of value, the ask",
      "Scripting a demo and preparing a fallback path",
      "Tailoring depth for executives vs engineers",
      "Whiteboarding a solution live",
      "Handling hard questions and live failures calmly"
    ],
    res: [
      ["How to Speak (Patrick Winston, MIT)", "https://www.youtube.com/watch?v=Unzc731iCUY", "video"],
      ["Storytelling with Data blog", "https://www.storytellingwithdata.com/blog", "article"]
    ],
    tip: "Har demo ka backup rakho: recorded video ya screenshots. Live demo fail ho to calmly backup pe shift karna bhi ek skill hai."
  }
});
