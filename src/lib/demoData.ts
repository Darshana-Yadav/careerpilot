import {
  CareerIntelligenceState,
  JobDescriptionAnalysis,
  TargetRoleName,
} from '../types/career';

export const AVAILABLE_TARGET_ROLES: {
  role: TargetRoleName;
  category: string;
  tagline: string;
  core_focus: string[];
}[] = [
  {
    role: 'Data Analyst',
    category: 'Analytics & BI',
    tagline: 'Transform operational datasets into executive KPIs, SQL pipelines, and decision dashboards.',
    core_focus: ['SQL', 'Python', 'Power BI / Tableau', 'Descriptive Statistics', 'Business Case Analysis'],
  },
  {
    role: 'Data Scientist',
    category: 'Data Science & ML',
    tagline: 'Build predictive models, statistical experiments, and causal inference frameworks.',
    core_focus: ['Python', 'Statistical Modeling', 'Machine Learning', 'SQL', 'Experimentation / A/B Testing'],
  },
  {
    role: 'AI Engineer',
    category: 'Applied AI & Systems',
    tagline: 'Architect production LLM pipelines, RAG systems, agentic workflows, and evaluation harnesses.',
    core_focus: ['Python / TypeScript', 'LLM Orchestration', 'RAG & Vector DBs', 'Cloud Deployment', 'Evaluation'],
  },
  {
    role: 'Machine Learning Engineer',
    category: 'MLOps & Infrastructure',
    tagline: 'Design, train, optimize, and deploy scalable machine learning systems in production.',
    core_focus: ['PyTorch / Scikit-Learn', 'MLOps & Docker', 'Cloud ML', 'Data Pipelines', 'Distributed Systems'],
  },
  {
    role: 'AI Product Manager',
    category: 'Product & Strategy',
    tagline: 'Define AI product strategy, evaluation metrics, user workflows, and cross-functional roadmaps.',
    core_focus: ['Product Strategy', 'AI/LLM Capabilities', 'SQL & Funnel Metrics', 'User Research', 'Stakeholder Alignment'],
  },
  {
    role: 'Business Analyst',
    category: 'Strategy & Operations',
    tagline: 'Bridge business operations and technical execution through process modeling and KPI reporting.',
    core_focus: ['SQL & Excel', 'Process Mapping', 'BI Dashboards', 'Requirements Gathering', 'Financial Modeling'],
  },
  {
    role: 'Product Analyst',
    category: 'Product Analytics',
    tagline: 'Analyze user cohorts, retention funnels, and feature adoption experiments to drive product growth.',
    core_focus: ['Advanced SQL', 'A/B Testing', 'Cohort & Funnel Analysis', 'Python', 'Product Storytelling'],
  },
  {
    role: 'Data Engineer',
    category: 'Data Infrastructure',
    tagline: 'Build reliable data warehouses, streaming ingestion pipelines, and lakehouse architectures.',
    core_focus: ['SQL & Data Modeling', 'Python / PySpark', 'Airflow & dbt', 'Cloud Data Warehouses', 'Distributed Systems'],
  },
  {
    role: 'Generative AI Developer',
    category: 'GenAI Applications',
    tagline: 'Build multimodal AI applications, structured tool-use agents, and fine-tuned model integrations.',
    core_focus: ['Gemini / LLM APIs', 'Prompt & Context Engineering', 'Full-Stack TypeScript/Python', 'Structured Outputs', 'Safety & Guardrails'],
  },
];

export const SAMPLE_RESUME_TEXT = `AARAV SHARMA
Email: aarav.sharma@univ.edu | GitHub: github.com/aarav-data | Location: Bengaluru, India

EDUCATION
B.Tech in Data Science & Engineering
National Institute of Technology | 2022 – 2026 | CGPA: 8.4/10
Relevant Coursework: Database Management Systems, Probability & Statistics, Exploratory Data Analysis, Machine Learning Foundations

TECHNICAL SKILLS
Programming & Data: Python, SQL, Pandas, NumPy, Data Cleaning
BI & Analytics Tools: Microsoft Excel (Pivot Tables, VLOOKUP), Power BI (Basic Dashboards), Matplotlib, Seaborn
Databases: PostgreSQL, MySQL

ACADEMIC & PERSONAL PROJECTS
1. Sales Dashboard
- Built a dashboard using Power BI and Excel to track regional store sales and monthly revenue trends.
- Cleaned raw CSV sales records using Python and Pandas to remove duplicate transactions and missing entries.

2. Customer Churn Analysis
- Analyzed telecom customer dataset using Python, Pandas, and Matplotlib to identify factors correlated with customer attrition.
- Performed exploratory data analysis and summary statistics on contract types, tenure, and monthly charges.

EXPERIENCE
Fresher (Final-Year Undergraduate Student)
- Seeking entry-level Data Analyst / Business Intelligence opportunities.
- Coordinator, University Data Science Club (Organized 2 campus analytics hackathons).

CERTIFICATIONS
- SQL for Data Science (Coursera)
- Python Data Analysis Foundations`;

export const SAMPLE_JOB_DESCRIPTIONS: JobDescriptionAnalysis[] = [
  {
    id: 'job-a-data-analyst',
    job_title: 'Data Analyst — Commercial & Revenue Intelligence',
    company_name: 'NovaRetail Analytics',
    analyzed_at: 'Demo Baseline',
    raw_text: `Role: Data Analyst (Entry to Junior Level, 0–2 Years Experience)
Location: Hybrid
Responsibilities:
- Write complex SQL queries (CTEs, window functions, joins) to extract and aggregate transactional retail data.
- Design and maintain automated Power BI dashboards tracking store revenue, margin cohorts, and inventory turnover.
- Perform statistical hypothesis testing and root-cause variance analysis on weekly business performance.
- Partner with commercial and supply chain stakeholders to translate ambiguous business questions into structured KPIs.
Requirements:
- Bachelor's degree in Data Science, Computer Science, Statistics, Economics, or related quantitative field.
- Strong proficiency in SQL and Python (Pandas, NumPy) for data wrangling and exploratory analysis.
- Hands-on experience with Power BI (DAX, data modeling) or Tableau, plus advanced Excel.
- Solid foundation in descriptive and inferential statistics.
- Nice to have: Experience with cloud data warehouses (BigQuery/Snowflake) and executive business case storytelling.`,
    overall_fit_score: 82,
    score_explanation:
      'Your SQL, Python, Pandas, and B.Tech in Data Science strongly align with the core technical requirements of this role. Strengthening advanced Power BI (DAX modeling) and business case storytelling will elevate your profile into the top tier.',
    weighted_breakdown: [
      {
        category: 'Technical Skills',
        weight: 35,
        score: 86,
        weighted_points: 30.1,
        explanation: 'Your SQL, Python, Pandas, and Excel skills directly match the primary technical stack.',
      },
      {
        category: 'Relevant Experience',
        weight: 20,
        score: 70,
        weighted_points: 14.0,
        explanation: 'Role accepts 0–2 years (Fresher eligible); academic club leadership and project depth partially offset formal work history.',
      },
      {
        category: 'Projects',
        weight: 15,
        score: 85,
        weighted_points: 12.8,
        explanation: 'Your Sales Dashboard and Customer Churn Analysis projects align closely with retail and commercial analytics.',
      },
      {
        category: 'Education',
        weight: 10,
        score: 95,
        weighted_points: 9.5,
        explanation: 'B.Tech in Data Science exceeds the quantitative bachelor’s degree requirement.',
      },
      {
        category: 'Tools/Technologies',
        weight: 10,
        score: 80,
        weighted_points: 8.0,
        explanation: 'Matches PostgreSQL, Excel, and Power BI; missing cloud data warehouse exposure (BigQuery/Snowflake).',
      },
      {
        category: 'Soft Skills',
        weight: 5,
        score: 78,
        weighted_points: 3.9,
        explanation: 'Demonstrated coordination skills; needs stronger evidence of stakeholder business storytelling on resume.',
      },
      {
        category: 'Domain Knowledge',
        weight: 5,
        score: 74,
        weighted_points: 3.7,
        explanation: 'Sales and churn projects demonstrate foundational commercial domain awareness.',
      },
    ],
    strong_matches: ['SQL', 'Python', 'Pandas', 'Excel', 'Exploratory Data Analysis', 'B.Tech in Data Science'],
    partial_matches: ['Power BI (Needs DAX & Star-Schema Modeling)', 'Inferential Statistics & Hypothesis Testing'],
    skill_gaps: ['Advanced SQL Window Functions & Query Tuning', 'Business Case & KPI Storytelling'],
    missing_requirements: ['Cloud Data Warehouse (BigQuery / Snowflake) — Nice to Have'],
    extracted_details: {
      required_skills: ['SQL', 'Python', 'Pandas', 'Power BI', 'Excel', 'Descriptive & Inferential Statistics'],
      preferred_skills: ['BigQuery / Snowflake', 'DAX Data Modeling', 'Executive Business Case Analysis'],
      years_of_experience: '0–2 years (Fresher / Entry-Level eligible)',
      education_requirements: "Bachelor's degree in Data Science, Statistics, CS, or quantitative field",
      responsibilities: [
        'Write complex SQL queries (CTEs, window functions) on transactional data',
        'Design automated Power BI dashboards for revenue and margin KPIs',
        'Conduct statistical variance and root-cause analysis',
        'Translate stakeholder questions into quantitative metrics',
      ],
      technologies: ['SQL', 'Python', 'Pandas', 'Power BI', 'Excel', 'BigQuery', 'Snowflake'],
      soft_skills: ['Stakeholder Communication', 'Structured Problem Solving', 'Business Storytelling'],
      domain_requirements: ['Retail & Commercial KPIs', 'Revenue & Churn Analytics'],
      keywords: ['SQL', 'CTEs', 'Window Functions', 'Power BI', 'DAX', 'KPIs', 'Cohort Analysis', 'Variance Analysis'],
      potential_gaps: [
        'Resume projects lack quantified business outcomes (e.g., % revenue variance identified)',
        'No explicit mention of advanced SQL window functions or DAX measures',
      ],
    },
    recommended_preparation: [
      'Upgrade your Sales Dashboard project with a star-schema data model and 5+ custom DAX measures in Power BI.',
      'Practice SQL window functions (RANK, LAG, LEAD, rolling averages) for retail cohort queries.',
      'Add quantified findings to both resume projects using the ACTION + TECHNOLOGY + TASK + RESULT structure.',
    ],
  },
  {
    id: 'job-b-product-analyst',
    job_title: 'Product Analyst — Growth & Funnel Intelligence',
    company_name: 'PulsePay FinTech',
    analyzed_at: 'Demo Baseline',
    raw_text: `Role: Product Analyst (0–2 Years Experience)
Responsibilities:
- Analyze user onboarding funnels, feature adoption, and retention cohorts using SQL and Python.
- Design, size, and evaluate A/B experiments with product managers and engineering leads.
- Build self-serve product health dashboards in Power BI / Amplitude.
Requirements:
- Strong SQL (funnel queries, retention cohorts) and Python proficiency.
- Solid understanding of A/B testing, p-values, statistical power, and sample size calculation.
- Experience with event-stream data and product metrics (DAU/MAU, LTV, CAC, Churn).`,
    overall_fit_score: 71,
    score_explanation:
      'Strong foundational match on Python, SQL, and Churn Analysis, but requires deeper preparation in A/B experimentation design, statistical power testing, and event-level funnel analytics.',
    weighted_breakdown: [
      {
        category: 'Technical Skills',
        weight: 35,
        score: 76,
        weighted_points: 26.6,
        explanation: 'SQL and Python are present, but A/B testing statistical design needs strengthening.',
      },
      {
        category: 'Relevant Experience',
        weight: 20,
        score: 65,
        weighted_points: 13.0,
        explanation: 'Fresher profile; lacks direct product event-stream internship experience.',
      },
      {
        category: 'Projects',
        weight: 15,
        score: 72,
        weighted_points: 10.8,
        explanation: 'Customer Churn Analysis is relevant, though a product funnel / A/B test project is missing.',
      },
      {
        category: 'Education',
        weight: 10,
        score: 92,
        weighted_points: 9.2,
        explanation: 'B.Tech in Data Science matches quantitative degree expectations.',
      },
      {
        category: 'Tools/Technologies',
        weight: 10,
        score: 68,
        weighted_points: 6.8,
        explanation: 'Has SQL, Python, Power BI; missing product analytics tools (Amplitude/Mixpanel).',
      },
      {
        category: 'Soft Skills',
        weight: 5,
        score: 70,
        weighted_points: 3.5,
        explanation: 'Good analytical base; needs product sense and hypothesis framing.',
      },
      {
        category: 'Domain Knowledge',
        weight: 5,
        score: 62,
        weighted_points: 3.1,
        explanation: 'Familiar with churn, but needs deeper fluency in LTV, CAC, DAU/MAU, and conversion funnels.',
      },
    ],
    strong_matches: ['Python', 'SQL', 'Pandas', 'Customer Churn Analysis'],
    partial_matches: ['Statistics (Needs A/B Testing & Sample Size Sizing)', 'Power BI'],
    skill_gaps: ['A/B Experimentation & Hypothesis Testing', 'Product Funnel & Cohort SQL Queries'],
    missing_requirements: ['Product Event Analytics (Amplitude / Mixpanel)', 'FinTech Funnel Metrics (LTV, CAC, DAU/MAU)'],
    extracted_details: {
      required_skills: ['SQL', 'Python', 'A/B Testing', 'Cohort & Funnel Analysis', 'Product Metrics'],
      preferred_skills: ['Amplitude / Mixpanel', 'FinTech Domain', 'Causal Inference'],
      years_of_experience: '0–2 years',
      education_requirements: "Bachelor's degree in Data Science, Statistics, or related field",
      responsibilities: [
        'Analyze onboarding funnels and retention cohorts',
        'Design and evaluate A/B experiments',
        'Build product health dashboards',
      ],
      technologies: ['SQL', 'Python', 'Power BI', 'Amplitude'],
      soft_skills: ['Product Sense', 'Cross-functional Collaboration'],
      domain_requirements: ['Product Growth Metrics', 'User Retention Cohorts'],
      keywords: ['A/B Testing', 'Cohort Analysis', 'Funnel Conversion', 'DAU/MAU', 'LTV', 'SQL', 'Statistical Power'],
      potential_gaps: ['No A/B testing or experiment analysis project on resume'],
    },
    recommended_preparation: [
      'Add an A/B Test Statistical Evaluation module to your portfolio.',
      'Practice writing SQL retention cohort queries using date truncation and window functions.',
    ],
  },
  {
    id: 'job-c-data-scientist',
    job_title: 'Associate Data Scientist — Predictive Modeling',
    company_name: 'CortexAI Labs',
    analyzed_at: 'Demo Baseline',
    raw_text: `Role: Associate Data Scientist (1–2 Years Experience Preferred)
Responsibilities:
- Train, tune, and deploy classification and regression models (XGBoost, LightGBM, Scikit-Learn) for customer propensity scoring.
- Build automated feature engineering pipelines in Python and SQL.
- Track model drift, ROC-AUC, precision-recall curves, and business lift in production.
Requirements:
- Strong proficiency in Python (Scikit-Learn, Pandas, NumPy) and SQL.
- Deep understanding of supervised/unsupervised machine learning, cross-validation, and hyperparameter tuning.
- Experience with Docker, FastAPI model serving, and cloud ML workflows.`,
    overall_fit_score: 58,
    score_explanation:
      'Your Python, SQL, and Pandas skills provide a solid starting point, but this role requires deeper Machine Learning engineering (Scikit-Learn/XGBoost pipelines, model deployment, and ML evaluation metrics) beyond current EDA projects.',
    weighted_breakdown: [
      {
        category: 'Technical Skills',
        weight: 35,
        score: 56,
        weighted_points: 19.6,
        explanation: 'Has Python, Pandas, and SQL, but lacks production Scikit-Learn/XGBoost modeling and MLOps.',
      },
      {
        category: 'Relevant Experience',
        weight: 20,
        score: 50,
        weighted_points: 10.0,
        explanation: 'Prefers 1–2 years of ML modeling experience.',
      },
      {
        category: 'Projects',
        weight: 15,
        score: 58,
        weighted_points: 8.7,
        explanation: 'Current Churn project focuses on EDA rather than calibrated predictive modeling and deployment.',
      },
      {
        category: 'Education',
        weight: 10,
        score: 90,
        weighted_points: 9.0,
        explanation: 'B.Tech in Data Science aligns well with foundational theory.',
      },
      {
        category: 'Tools/Technologies',
        weight: 10,
        score: 52,
        weighted_points: 5.2,
        explanation: 'Missing Scikit-Learn, XGBoost, Docker, and FastAPI on resume.',
      },
      {
        category: 'Soft Skills',
        weight: 5,
        score: 70,
        weighted_points: 3.5,
        explanation: 'Analytical communication is transferable.',
      },
      {
        category: 'Domain Knowledge',
        weight: 5,
        score: 40,
        weighted_points: 2.0,
        explanation: 'Needs deeper experience translating ML probabilities into business lift.',
      },
    ],
    strong_matches: ['Python', 'SQL', 'Pandas', 'B.Tech in Data Science'],
    partial_matches: ['Statistics', 'Customer Churn Domain (EDA level only)'],
    skill_gaps: ['Supervised ML (Scikit-Learn, XGBoost)', 'Feature Engineering & Cross-Validation', 'Model Evaluation (ROC-AUC, Precision-Recall)'],
    missing_requirements: ['Model Serving (FastAPI / Docker)', 'Production Drift Monitoring'],
    extracted_details: {
      required_skills: ['Python', 'SQL', 'Scikit-Learn', 'XGBoost', 'Feature Engineering', 'Model Evaluation'],
      preferred_skills: ['Docker', 'FastAPI', 'Cloud ML Pipelines'],
      years_of_experience: '1–2 years preferred',
      education_requirements: "Bachelor's or Master's in Data Science, CS, or Statistics",
      responsibilities: [
        'Train and tune gradient boosted models for propensity scoring',
        'Build automated feature engineering pipelines',
        'Monitor ROC-AUC, precision-recall, and model drift',
      ],
      technologies: ['Python', 'SQL', 'Scikit-Learn', 'XGBoost', 'Docker', 'FastAPI'],
      soft_skills: ['Quantitative Reasoning', 'Experiment Documentation'],
      domain_requirements: ['Propensity Scoring', 'Predictive Churn Modeling'],
      keywords: ['XGBoost', 'Scikit-Learn', 'ROC-AUC', 'Feature Engineering', 'Hyperparameter Tuning', 'FastAPI'],
      potential_gaps: ['Resume lists Churn EDA but no trained ML classifiers or evaluation metrics'],
    },
    recommended_preparation: [
      'Extend your Customer Churn Analysis into a full Scikit-Learn/XGBoost predictive pipeline with SHAP explainability.',
      'Deploy the model behind a lightweight FastAPI endpoint to demonstrate end-to-end ML capability.',
    ],
  },
];

export const INITIAL_DEMO_STATE: CareerIntelligenceState = {
  isDemoMode: true,
  hasAnalyzed: true,
  profile: {
    name: 'Aarav Sharma',
    headline: 'Final-Year B.Tech in Data Science Candidate',
    education_level: 'B.Tech in Data Science (Undergraduate Final Year)',
    experience_level: 'Fresher (0 Years Formal Work Experience)',
    target_role: 'Data Analyst',
    weekly_hours: '10 hours/week',
    career_goal:
      'Secure a high-impact Data Analyst role by mastering production SQL, business intelligence storytelling, and end-to-end commercial analytics projects.',
    education: [
      {
        degree: 'B.Tech in Data Science',
        institution: 'National Institute of Technology',
        year: '2022 – 2026',
        details: 'CGPA: 8.4/10 · Coursework: DBMS, Probability & Statistics, Exploratory Data Analysis',
      },
    ],
    technical_skills: [
      'Python',
      'SQL',
      'Excel',
      'Statistics',
      'Pandas',
      'Power BI',
      'Data Cleaning',
      'Data Visualization',
    ],
    soft_skills: [
      'Analytical Problem Solving',
      'Cross-Team Coordination',
      'Structured Presentation',
    ],
    projects: [
      {
        title: 'Sales Dashboard',
        description:
          'Built a regional sales tracking dashboard using Power BI and Excel; cleaned raw CSV transaction records in Python (Pandas) to standardize date formats and remove duplicate entries.',
        technologies: ['Power BI', 'Excel', 'Python', 'Pandas'],
        outcomes: 'Visualized monthly revenue trends across product categories and regional stores.',
      },
      {
        title: 'Customer Churn Analysis',
        description:
          'Conducted exploratory data analysis on a telecom customer dataset using Python, Pandas, and Matplotlib to identify contract tenure and billing patterns associated with churn.',
        technologies: ['Python', 'Pandas', 'Statistics', 'Data Visualization'],
        outcomes: 'Identified high-risk tenure segments and summarized churn drivers.',
      },
    ],
    experience: [
      {
        role: 'Fresher · Analytics Club Coordinator',
        company: 'University Data Science Society',
        duration: '2025 – Present',
        highlights: [
          'Coordinated 2 campus-wide data analytics hackathons with 150+ student participants.',
          'Mentored junior students on introductory Python, Pandas, and SQL querying.',
        ],
      },
    ],
    certifications: [
      'SQL for Data Science (Coursera)',
      'Python Data Analysis Foundations',
    ],
    achievements: [
      'Finalist in University Annual Datathon (Top 5 out of 48 teams)',
      'Coordinated 2 campus analytics hackathons',
    ],
    technologies: ['Python', 'SQL', 'PostgreSQL', 'Excel', 'Pandas', 'Power BI', 'Matplotlib'],
    strengths: [
      'Strong core foundation in SQL, Python, Pandas, and Excel data cleaning',
      'Relevant B.Tech in Data Science academic background',
      'Two domain-relevant foundational projects (Sales & Customer Churn)',
    ],
    missing_information: [
      'Projects currently lack quantified business outcomes or measurable impact metrics',
      'No link to a live interactive portfolio or public GitHub repository readme with SQL scripts',
      'Power BI proficiency level (DAX measures, star-schema data modeling) is not specified',
    ],
    raw_resume_text: SAMPLE_RESUME_TEXT,
    resume_file_name: 'Aarav_Sharma_Data_Science_Resume.pdf (Demo Profile)',
  },
  roleAnalysis: {
    role: 'Data Analyst',
    overview:
      'Modern Data Analysts bridge raw operational databases and executive strategy. Beyond basic querying and charting, hiring teams evaluate candidates on advanced analytical SQL (window functions, CTEs), data modeling in BI tools, statistical rigor, and the ability to frame technical findings as actionable business recommendations.',
    disclaimer:
      'Competency priorities reflect typical industry hiring patterns across technology, retail, and financial services. Specific requirements vary by company maturity and team structure—no single tool is universally required by every employer.',
    competencies: [
      {
        category: 'Programming',
        skills: ['Python (Pandas, NumPy)', 'Automated Data Scripting'],
        importance: 'Required',
        rationale: 'Essential for programmatic data cleaning, automation, and exploratory analysis beyond spreadsheet limits.',
      },
      {
        category: 'Databases',
        skills: ['Analytical SQL (Joins, CTEs, Window Functions)', 'Query Optimization', 'PostgreSQL / Relational Schemas'],
        importance: 'Required',
        rationale: 'SQL is the primary examination gate in over 85% of entry-to-mid Data Analyst technical interviews.',
      },
      {
        category: 'Data',
        skills: ['Data Cleaning & Validation', 'Exploratory Data Analysis (EDA)', 'KPI & Metric Definition'],
        importance: 'Required',
        rationale: 'Real-world datasets contain missingness, schema drift, and anomalies that require systematic validation.',
      },
      {
        category: 'Visualization',
        skills: ['Power BI (DAX, Star Schema)', 'Tableau', 'Executive Dashboard Design', 'Advanced Excel'],
        importance: 'Required',
        rationale: 'Translates raw query outputs into self-serve decision tools for business stakeholders.',
      },
      {
        category: 'Statistics',
        skills: ['Descriptive Statistics', 'Hypothesis Testing (t-tests, Chi-square)', 'A/B Test Interpretation', 'Correlation vs. Causation'],
        importance: 'Important',
        rationale: 'Prevents false conclusions when evaluating marketing campaigns, pricing changes, or product experiments.',
      },
      {
        category: 'Product/business skills',
        skills: ['Business Case Analysis', 'Cohort & Funnel Metrics', 'Unit Economics (CAC, LTV, Churn)', 'Root-Cause Analysis'],
        importance: 'Important',
        rationale: 'Separates strategic analysts who drive revenue decisions from passive report builders.',
      },
      {
        category: 'Communication',
        skills: ['Executive Data Storytelling', 'Structured Written Recommendations (MECE)', 'Stakeholder Requirement Scoping'],
        importance: 'Important',
        rationale: 'Insights only create value when clearly communicated to non-technical decision-makers.',
      },
      {
        category: 'Domain knowledge',
        skills: ['Commercial & Retail Analytics', 'Financial & Revenue Operations', 'Supply Chain / Customer Lifecycle'],
        importance: 'Important',
        rationale: 'Contextualizes raw numbers within real business constraints and industry benchmarks.',
      },
      {
        category: 'Interview readiness',
        skills: ['Live Timed SQL Coding', 'Business Case Walkthroughs', 'Behavioral STAR Project Narratives'],
        importance: 'Required',
        rationale: 'Converts technical capability into actual job offers through structured interview execution.',
      },
      {
        category: 'Cloud',
        skills: ['BigQuery / Snowflake Basics', 'dbt Fundamentals'],
        importance: 'Nice to Have',
        rationale: 'Increasingly common in modern analytics stacks, though often learned on the job for entry-level roles.',
      },
      {
        category: 'Machine Learning',
        skills: ['Regression Analysis', 'Customer Segmentation (K-Means)', 'Time-Series Forecasting Basics'],
        importance: 'Nice to Have',
        rationale: 'Useful for advanced diagnostic and forecasting tasks, though secondary to SQL and BI for core analyst roles.',
      },
      {
        category: 'Generative AI',
        skills: ['AI-Assisted SQL & Python Workflows', 'Automated Insight Summarization', 'Prompt Engineering for Analytics'],
        importance: 'Nice to Have',
        rationale: 'Accelerates analyst productivity in 2026 workflows when paired with strong verification habits.',
      },
    ],
    radar_benchmarks: [
      { axis: 'SQL & Databases', candidate_score: 78, target_benchmark: 90 },
      { axis: 'Python & Data Cleaning', candidate_score: 84, target_benchmark: 85 },
      { axis: 'BI & Visualization', candidate_score: 68, target_benchmark: 88 },
      { axis: 'Statistical Analysis', candidate_score: 64, target_benchmark: 82 },
      { axis: 'Business Case Strategy', candidate_score: 55, target_benchmark: 85 },
      { axis: 'Interview & Portfolio Depth', candidate_score: 66, target_benchmark: 88 },
    ],
  },
  skillGap: {
    skills_already_have: [
      'Python',
      'SQL (Foundational Queries & Joins)',
      'Excel (Pivot Tables, Lookups)',
      'Pandas & Data Cleaning',
      'Exploratory Data Visualization',
    ],
    skills_to_strengthen: [
      'Power BI (Upgrade from basic charts to Star-Schema & DAX measures)',
      'Statistics (Hypothesis testing, confidence intervals, A/B testing)',
      'SQL (Analytical Window Functions & CTE performance)',
    ],
    high_priority_gaps: [
      {
        skill: 'Advanced Analytical SQL',
        category: 'Databases',
        priority: 'High',
        level: 'Intermediate',
        why_it_matters:
          'Technical screening rounds for Data Analysts heavily test multi-step CTEs, window functions (ROW_NUMBER, LAG/LEAD, rolling averages), and cohort retention queries.',
        learning_sequence: [
          '1. Multi-level Common Table Expressions (CTEs) and subqueries',
          '2. Window functions: RANK, DENSE_RANK, LAG, LEAD, and moving window frames',
          '3. Cohort retention, YoY growth, and funnel drop-off SQL patterns',
        ],
        practical_project:
          'Write a 12-query SQL analytics suite analyzing customer repeat purchase rates and monthly revenue retention on a 100k+ row e-commerce database.',
        interview_topic:
          'Calculating 30-day rolling revenue and identifying top 3 products per region using PARTITION BY without self-joins.',
      },
      {
        skill: 'Power BI Data Modeling & Executive Dashboard Design',
        category: 'Visualization',
        priority: 'High',
        level: 'Intermediate',
        why_it_matters:
          'Employers look beyond static charts for analysts who can model relational tables (Star Schema), write dynamic DAX measures, and design decision-oriented KPI views.',
        learning_sequence: [
          '1. Dimensional modeling: Fact vs. Dimension tables and 1-to-many relationships',
          '2. Core DAX: CALCULATE, FILTER, Time Intelligence (YTD, YoY, MoM variance)',
          '3. Executive UX: KPI hierarchy, drill-through pages, and actionable variance callouts',
        ],
        practical_project:
          'Retail Sales Intelligence Platform with interactive margin waterfall, store cohort filters, and automated YoY DAX variance indicators.',
        interview_topic:
          'Explaining why a Star Schema outperforms a single flat table in Power BI and walking through how CALCULATE alters filter context.',
      },
      {
        skill: 'Statistical Hypothesis & Business Case Analysis',
        category: 'Product/business skills',
        priority: 'High',
        level: 'Intermediate',
        why_it_matters:
          'Hiring managers test whether you can diagnose why a metric dropped (e.g., "Revenue fell 12% in Q3—how do you investigate?") and validate findings statistically.',
        learning_sequence: [
          '1. Metric decomposition trees (Revenue = Traffic × Conversion × AOV)',
          '2. Two-sample t-tests, Chi-square tests, p-values, and practical significance',
          '3. Structuring executive recommendations (Problem → Evidence → Quantified Action)',
        ],
        practical_project:
          'Add a Statistical Root-Cause & Pricing Experiment module to your Customer Churn Analysis project.',
        interview_topic:
          'Investigating a sudden 15% spike in customer churn across regional cohorts and designing an experiment to test a retention offer.',
      },
    ],
    summary_note:
      'Focused on the 3 highest-leverage competencies that directly impact Data Analyst interview pass rates—avoiding unnecessary tool sprawl.',
  },
  roadmap: {
    weekly_hours: '10 hours/week',
    total_estimated_weeks: 8,
    thirty_day_sprint: [
      {
        week: 'Week 1',
        focus: 'Advanced SQL & Analytical Query Patterns',
        deliverable: 'Complete 20 timed window-function & cohort SQL challenges + document scripts in GitHub.',
      },
      {
        week: 'Week 2',
        focus: 'Power BI Star-Schema Modeling & DAX',
        deliverable: 'Build relational data model and 8 core DAX time-intelligence measures.',
      },
      {
        week: 'Week 3',
        focus: 'Flagship Project: Retail Sales Intelligence Platform',
        deliverable: 'Publish end-to-end SQL + Python + Power BI project with executive business memo.',
      },
      {
        week: 'Week 4',
        focus: 'Resume Quantification & Mock Case Interviews',
        deliverable: 'Rewrite resume bullets with measurable KPIs and complete 15 technical + case interview drills.',
      },
    ],
    phases: [
      {
        phase_number: 1,
        phase_title: 'Phase 1 — Foundation Consolidation',
        goal: 'Upgrade existing SQL and Python data wrangling from classroom syntax to production-grade analytical patterns.',
        skills: ['Analytical SQL', 'CTEs & Window Functions', 'Pandas Data Validation'],
        tasks: [
          {
            id: 'p1-t1',
            title: 'Master SQL Window Functions (ROW_NUMBER, RANK, LAG, LEAD, SUM OVER) on transactional schemas',
            completed: true,
          },
          {
            id: 'p1-t2',
            title: 'Build a reusable Python Pandas data quality audit script (missingness, outliers, duplicate keys)',
            completed: true,
          },
          {
            id: 'p1-t3',
            title: 'Solve 15 medium-to-hard SQL business cohort problems without looking at hints',
            completed: false,
          },
        ],
        project: 'SQL Cohort & Retention Query Library (PostgreSQL)',
        estimated_time: '1.5 Weeks (15 hours)',
        completion_criteria: 'Can write a multi-CTE monthly customer retention query from scratch in under 15 minutes.',
      },
      {
        phase_number: 2,
        phase_title: 'Phase 2 — Core BI & Statistical Rigor',
        goal: 'Close the gap in Power BI dimensional modeling, DAX time-intelligence, and statistical hypothesis testing.',
        skills: ['Power BI Star Schema', 'DAX Measures', 'Hypothesis Testing', 'KPI Decomposition'],
        tasks: [
          {
            id: 'p2-t1',
            title: 'Design a clean Star Schema (1 Fact table + 4 Dimension tables) in Power BI',
            completed: false,
          },
          {
            id: 'p2-t2',
            title: 'Write DAX measures for YoY Revenue Growth, Rolling 90-Day Churn, and Margin Contribution %',
            completed: false,
          },
          {
            id: 'p2-t3',
            title: 'Implement a Python notebook conducting two-sample t-tests and Chi-square tests on customer segments',
            completed: false,
          },
        ],
        project: 'Statistical Churn & Pricing Experiment Notebook',
        estimated_time: '2 Weeks (20 hours)',
        completion_criteria: 'Power BI model passes zero many-to-many warning checks and statistical notebook clearly interprets p-values and effect sizes.',
      },
      {
        phase_number: 3,
        phase_title: 'Phase 3 — Practical End-to-End Flagship Project',
        goal: 'Combine SQL, Python, and Power BI into a business-focused flagship project that proves commercial acumen.',
        skills: ['End-to-End Analytics Pipeline', 'Commercial KPI Design', 'Executive Storytelling'],
        tasks: [
          {
            id: 'p3-t1',
            title: 'Ingest and model 100k+ retail order rows in PostgreSQL and extract aggregated views via SQL',
            completed: false,
          },
          {
            id: 'p3-t2',
            title: 'Build the interactive 3-page Retail Sales Intelligence Platform in Power BI',
            completed: false,
          },
          {
            id: 'p3-t3',
            title: 'Write a 1-page Executive Summary quantifying 3 concrete revenue/margin optimization recommendations',
            completed: false,
          },
        ],
        project: 'Retail Sales Intelligence Platform',
        estimated_time: '2 Weeks (20 hours)',
        completion_criteria: 'Complete repository with SQL schema, Python validation script, Power BI dashboard screenshots, and quantified business recommendations.',
      },
      {
        phase_number: 4,
        phase_title: 'Phase 4 — Portfolio Packaging & Proof of Work',
        goal: 'Structure your projects so recruiters and hiring managers can verify your technical depth in under 60 seconds.',
        skills: ['GitHub Technical Documentation', 'Case Study Framing', 'Metric Quantification'],
        tasks: [
          {
            id: 'p4-t1',
            title: 'Upgrade Customer Churn Analysis with logistic regression / decision tree drivers and business cost calculation',
            completed: false,
          },
          {
            id: 'p4-t2',
            title: 'Create structured READMEs for both flagship projects featuring Business Problem → Architecture → Key Findings',
            completed: false,
          },
        ],
        project: 'Public Analytics Portfolio & Case Study Hub',
        estimated_time: '1 Week (10 hours)',
        completion_criteria: '2 polished case studies live on GitHub with clear architecture diagrams, SQL snippets, and business impact summaries.',
      },
      {
        phase_number: 5,
        phase_title: 'Phase 5 — Interview Preparation',
        goal: 'Master timed technical SQL screens, project deep-dives, and structured business case walkthroughs.',
        skills: ['Timed SQL Interviews', 'Business Case Frameworks', 'STAR Behavioral Narratives'],
        tasks: [
          {
            id: 'p5-t1',
            title: 'Practice verbal walkthroughs of Sales Dashboard and Customer Churn projects using the STAR framework',
            completed: false,
          },
          {
            id: 'p5-t2',
            title: 'Complete 5 mock metric-diagnostic case questions (e.g., investigating conversion drop-offs)',
            completed: false,
          },
        ],
        project: 'Interview Casebook & SQL Cheat Sheet',
        estimated_time: '1 Week (10 hours)',
        completion_criteria: 'Confidently answer technical SQL, project trade-off, and behavioral questions aloud with crisp 2-minute structure.',
      },
      {
        phase_number: 6,
        phase_title: 'Phase 6 — Targeted Job Application Execution',
        goal: 'Apply strategically with tailored resumes, high job-fit targeting, and direct hiring manager outreach.',
        skills: ['ATS Keyword Alignment', 'Tailored Resume Summaries', 'Targeted Outreach'],
        tasks: [
          {
            id: 'p6-t1',
            title: 'Update resume with ACTION + TECHNOLOGY + TASK + RESULT bullets and run Job Fit Analyzer on target JDs',
            completed: false,
          },
          {
            id: 'p6-t2',
            title: 'Submit 15 high-fit applications (>75% Job Fit Score) with tailored portfolio links',
            completed: false,
          },
        ],
        project: 'Tailored Application & Referral Pipeline',
        estimated_time: '0.5 Weeks (5 hours ongoing)',
        completion_criteria: 'Resume achieves 85+/100 strength score and active interview pipeline is established.',
      },
    ],
  },
  projects: [
    {
      id: 'proj-1',
      title: 'Retail Sales Intelligence Platform',
      business_problem:
        'Regional retail managers lack visibility into SKU-level margin erosion, promotional discount leakage, and store cohort retention, leading to suboptimal inventory allocation.',
      difficulty: 'Intermediate',
      technologies: ['PostgreSQL', 'SQL (Window Functions, CTEs)', 'Python (Pandas)', 'Power BI (DAX, Star Schema)'],
      dataset_requirements:
        'Multi-table retail transactional dataset (Orders, Order_Items, Products, Stores, Customers — 100,000+ rows such as Olist E-Commerce or Superstore Extended).',
      ai_component:
        'Automated Python + Gemini API executive anomaly summarizer that translates weekly regional margin variances into natural-language store manager briefs.',
      expected_output:
        'Relational SQL scripts, Star-Schema Power BI dashboard with YoY/MoM DAX measures, and an executive memo identifying top margin-recovery actions.',
      resume_bullet_suggestion:
        'Engineered an end-to-end Retail Sales Intelligence Platform using PostgreSQL, Python (Pandas), and Power BI across [X]+ transactional records, designing a Star-Schema model and DAX variance measures to pinpoint regional margin leakage.',
      skills_demonstrated: ['Advanced SQL', 'Power BI Data Modeling', 'DAX', 'Python Data Cleaning', 'Commercial KPI Analysis'],
      why_recommended:
        'Directly upgrades your existing "Sales Dashboard" into a production-caliber commercial analytics system that proves SQL modeling, DAX, and business decision-making.',
    },
    {
      id: 'proj-2',
      title: 'Customer Churn & Revenue Retention Intelligence',
      business_problem:
        'Subscription telecom and SaaS businesses lose recurring revenue when high-value customer segments churn silently without early risk scoring or targeted retention interventions.',
      difficulty: 'Intermediate',
      technologies: ['Python (Pandas, Scikit-Learn, SciPy)', 'SQL', 'Power BI', 'Statistical Hypothesis Testing'],
      dataset_requirements:
        'Telco Customer Churn or SaaS Subscription Cohort dataset including tenure, contract tier, support tickets, usage frequency, and monthly recurring revenue (MRR).',
      ai_component:
        'Explainable churn risk cohort profiler with automated retention playbook generation for high-risk customer segments.',
      expected_output:
        'SQL cohort retention matrix, statistical hypothesis test report (t-test/Chi-square on churn drivers), calibrated churn risk score, and ROI simulator for retention campaigns.',
      resume_bullet_suggestion:
        'Conducted statistical cohort and churn driver analysis using Python (Pandas, SciPy) and SQL across customer subscription records, quantifying high-risk contract segments and building a retention ROI simulator in Power BI.',
      skills_demonstrated: ['Cohort Analysis', 'Statistical Hypothesis Testing', 'Python (Pandas/SciPy)', 'Revenue Retention Metrics'],
      why_recommended:
        'Transforms your existing EDA-only "Customer Churn Analysis" project into a statistically rigorous business case with clear revenue impact.',
    },
    {
      id: 'proj-3',
      title: 'Supply Chain & Inventory SLA Diagnostic System',
      business_problem:
        'Late vendor deliveries and warehouse stockouts inflate fulfillment costs and degrade customer net promoter scores (NPS).',
      difficulty: 'Advanced',
      technologies: ['SQL', 'Python', 'Power BI', 'Time-Series Forecasting', 'Gemini Structured Output API'],
      dataset_requirements:
        'Supply chain shipment, warehouse lead-time, and vendor SLA performance dataset across multiple distribution centers.',
      ai_component:
        'Agentic SLA Risk Monitor that evaluates vendor lead-time drift and drafts prioritized procurement alerts.',
      expected_output:
        'Vendor SLA scorecard, safety-stock optimization calculator in Python, and interactive logistics bottleneck dashboard.',
      resume_bullet_suggestion:
        'Developed a Supply Chain SLA Diagnostic System using SQL and Python to evaluate vendor lead-time variance and optimize warehouse safety-stock thresholds across distribution nodes.',
      skills_demonstrated: ['Operations Analytics', 'Root-Cause Variance Analysis', 'Advanced SQL', 'Supply Chain KPIs'],
      why_recommended:
        'Demonstrates versatility across operations and supply chain analytics—a major hiring segment for entry-level Data Analysts.',
    },
  ],
  resumeReport: {
    resume_strength_score: 68,
    score_rationale:
      'Strong technical alignment with B.Tech in Data Science and core tools (Python, SQL, Pandas, Power BI, Excel), but project descriptions currently read as passive task lists without quantified business outcomes, data scale, or specific SQL/DAX complexity.',
    customized_professional_summary:
      'Data Analytics candidate (B.Tech in Data Science) skilled in SQL, Python (Pandas), Power BI, and statistical data analysis. Proven ability to clean relational datasets, uncover customer churn drivers, and build interactive sales KPI dashboards. Seeking an entry-level Data Analyst role to drive data-informed commercial and operational decisions.',
    problems_detected: [
      'Weak project descriptions: Project bullets describe tools used rather than analytical methodology or business insights discovered.',
      'Missing measurable outcomes: Neither the Sales Dashboard nor Customer Churn Analysis specifies dataset volume, number of KPIs tracked, or quantified findings.',
      'Missing relevant keywords: Lacks high-signal Data Analyst terms such as CTEs, Window Functions, Star Schema, DAX, Cohort Analysis, and KPI Variance.',
      'Generic summary / objective: Resume lacks a sharp, role-targeted 3-line executive summary at the top.',
      'Unclear tool depth: Lists Power BI and SQL without indicating advanced capabilities (e.g., relational modeling, aggregations, joins).',
    ],
    improvement_suggestions: [
      {
        issue: 'Project bullets lack measurable scope and analytical outcomes',
        category: 'Measurable Outcomes',
        why_it_matters:
          'Recruiters and hiring managers scan project bullets for evidence of scale (rows/tables processed) and decision impact (what insight the analysis unlocked).',
        action_to_take:
          'Add the exact dataset size, number of KPIs modeled, and the primary business finding to both your Sales Dashboard and Customer Churn bullets.',
      },
      {
        issue: 'Technical skills section does not specify SQL and Power BI sub-competencies',
        category: 'Keywords',
        why_it_matters:
          'Applicant Tracking Systems (ATS) and technical screeners filter for specific capabilities like Joins, CTEs, Window Functions, DAX, and Data Modeling.',
        action_to_take:
          'Expand "SQL" to "SQL (PostgreSQL, Joins, CTEs, Window Functions)" and "Power BI" to "Power BI (DAX, Data Modeling, KPI Dashboards)" once practiced.',
      },
      {
        issue: 'Passive verb phrasing in project descriptions',
        category: 'Project Descriptions',
        why_it_matters:
          'Starting bullets with "Built a dashboard" or "Analyzed dataset" understates your engineering and analytical rigor.',
        action_to_take:
          'Apply the ACTION + TECHNOLOGY + TASK + RESULT structure to lead with strong analytical verbs (Engineered, Modeled, Automated, Diagnosed).',
      },
      {
        issue: 'Missing professional summary tailored to Data Analyst roles',
        category: 'Summary',
        why_it_matters:
          'Fresher resumes benefit from an immediate 3-line anchor that connects academic Data Science training to practical business analytics readiness.',
        action_to_take:
          'Insert the customized professional summary above your Education section.',
      },
    ],
    bullet_rewrites: [
      {
        original_context: 'Sales Dashboard: Built a dashboard using Power BI and Excel to track regional store sales and monthly revenue trends.',
        improved_bullet:
          'Designed an interactive Sales Intelligence Dashboard using Power BI and Excel to monitor regional store revenue and product category trends, enabling automated monthly KPI tracking across store segments.',
        formula_breakdown: {
          action: 'Designed',
          technology: 'Power BI and Excel',
          task: 'an interactive Sales Intelligence Dashboard to monitor regional store revenue and product category trends',
          result: 'enabling automated monthly KPI tracking across store segments',
        },
      },
      {
        original_context: 'Sales Dashboard: Cleaned raw CSV sales records using Python and Pandas to remove duplicate transactions and missing entries.',
        improved_bullet:
          'Automated data cleaning and schema validation pipelines in Python (Pandas) to resolve duplicate transactions and missing records in raw CSV sales logs, establishing a clean dataset for downstream BI reporting.',
        formula_breakdown: {
          action: 'Automated',
          technology: 'Python (Pandas)',
          task: 'data cleaning and schema validation pipelines to resolve duplicate transactions and missing records',
          result: 'establishing a clean dataset for downstream BI reporting',
        },
      },
      {
        original_context: 'Customer Churn Analysis: Analyzed telecom customer dataset using Python, Pandas, and Matplotlib to identify factors correlated with customer attrition.',
        improved_bullet:
          'Conducted exploratory data analysis and statistical profiling using Python (Pandas, Matplotlib) on telecom customer records to isolate contract tenure and billing factors correlated with customer attrition.',
        formula_breakdown: {
          action: 'Conducted',
          technology: 'Python (Pandas, Matplotlib)',
          task: 'exploratory data analysis and statistical profiling on telecom customer records',
          result: 'to isolate contract tenure and billing factors correlated with customer attrition',
        },
      },
    ],
  },
  interviewQuestions: [
    {
      id: 'iq-tech-1',
      category: 'Technical',
      topic: 'SQL — Window Functions & Cohort Filtering',
      question:
        'Given an `orders(order_id, customer_id, store_region, order_date, revenue)` table, how would you write a query to find the top 3 highest-revenue customers in each store region for Q3, handling ties without skipping ranks?',
      difficulty: 'Intermediate',
      what_interviewer_is_testing:
        'Understanding of `DENSE_RANK()` vs. `ROW_NUMBER()` and `RANK()`, aggregation before window partitioning, and CTE filtering.',
      key_points_to_include: [
        'First aggregate total Q3 revenue per `customer_id` and `store_region` inside a CTE using `GROUP BY`.',
        'Apply `DENSE_RANK() OVER (PARTITION BY store_region ORDER BY total_revenue DESC)` so tied customers receive the same rank without gaps.',
        'Filter `WHERE rnk <= 3` in the outer query (since window functions cannot appear in the `WHERE` clause of the same `SELECT`).',
      ],
      example_answer_structure:
        '1. Clarify granularity (multiple orders per customer require summing first) → 2. Write CTE1 for Q3 date filtering and customer revenue sum → 3. Write CTE2 applying DENSE_RANK partitioned by region → 4. Select final top 3 rows.',
    },
    {
      id: 'iq-tech-2',
      category: 'Technical',
      topic: 'Python & Pandas — Data Cleaning & Integrity',
      question:
        'When cleaning raw transactional data in Pandas, how do you distinguish between missing values that should be imputed versus missing values that indicate a broken upstream data pipeline?',
      difficulty: 'Intermediate',
      what_interviewer_is_testing:
        'Real-world data intuition (MCAR/MAR/MNAR), validation checks before blind `.fillna()`, and protecting KPI integrity.',
      key_points_to_include: [
        'Check missingness distribution across dates, regions, or categories before imputing.',
        'Never blindly impute primary keys, transaction timestamps, or core financial amounts with mean/median.',
        'Use median or segment-level imputation only for skewed numerical features after verifying missingness is random, and flag imputed rows with a boolean indicator column.',
      ],
      example_answer_structure:
        '1. Diagnose pattern of missingness → 2. Categorize critical financial fields vs. auxiliary attributes → 3. Explain validation assertions and stakeholder escalation if pipeline drift is detected.',
    },
    {
      id: 'iq-tech-3',
      category: 'Technical',
      topic: 'Statistics — Hypothesis Testing & Business Metrics',
      question:
        'Suppose a retail region launches a new promotional discount and average order value (AOV) increases by 6%. How would you test whether this increase is statistically significant or just random seasonal noise?',
      difficulty: 'Intermediate',
      what_interviewer_is_testing:
        'Practical application of hypothesis testing (Null/Alternative hypothesis, two-sample t-test or Mann-Whitney U test for skewed order values, and confounding variables).',
      key_points_to_include: [
        'Define Null Hypothesis ($H_0$: no difference in AOV) and Alternative Hypothesis ($H_1$: promotional AOV differs).',
        'Inspect distribution skewness (retail order values are often right-skewed, requiring log transformation, bootstrapping, or Mann-Whitney test alongside Welch’s t-test).',
        'Check for seasonality and margin impact (did total net profit increase, or did discounts erode margin despite higher AOV?).',
      ],
      example_answer_structure:
        '1. Frame hypotheses and control group → 2. Check sample size and skewness → 3. Run statistical test & evaluate p-value + confidence interval → 4. Evaluate commercial net margin impact.',
    },
    {
      id: 'iq-proj-1',
      category: 'Project-Based',
      topic: 'Resume Project — Customer Churn Analysis',
      question:
        'In your Customer Churn Analysis project, which specific variables had the strongest association with customer attrition, and how would a business team practically act on your findings?',
      difficulty: 'Intermediate',
      what_interviewer_is_testing:
        'Ownership of your resume project, ability to connect exploratory charts to concrete retention actions, and awareness of correlation vs. causation.',
      key_points_to_include: [
        'Walk through the dataset structure and data cleaning steps performed in Python/Pandas.',
        'Highlight key segments (e.g., month-to-month contracts vs. annual contracts, early-tenure drop-offs, high monthly charges).',
        'Propose a targeted business intervention (e.g., offering an onboarding check-in or annual upgrade incentive at month 3) and define the metric used to track success.',
      ],
      example_answer_structure:
        '1. Context & dataset scope → 2. Data cleaning & EDA methodology in Pandas → 3. Top 2–3 churn drivers uncovered → 4. Actionable business recommendation & how you would measure lift.',
    },
    {
      id: 'iq-proj-2',
      category: 'Project-Based',
      topic: 'Resume Project — Sales Dashboard (Power BI & Excel)',
      question:
        'Walk me through how you cleaned the raw CSV sales data in Python before loading it into Power BI, and what was the most important design choice you made on the Sales Dashboard?',
      difficulty: 'Entry',
      what_interviewer_is_testing:
        'End-to-end workflow understanding (Python ETL → Power BI reporting) and dashboard usability for decision-makers.',
      key_points_to_include: [
        'Explain specific anomalies handled in Pandas (deduplicating transaction IDs, standardizing inconsistent date formats, handling null store codes).',
        'Describe how the dashboard was organized (top-level revenue KPIs, regional comparison, time-series trend).',
        'Share what you would improve next (e.g., migrating from flat CSV import to a relational Star Schema with DAX YoY variance measures).',
      ],
      example_answer_structure:
        '1. Raw data challenges encountered → 2. Python Pandas transformation pipeline → 3. Power BI visual hierarchy → 4. Proactive reflection on v2 architectural upgrades.',
    },
    {
      id: 'iq-beh-1',
      category: 'Behavioral',
      topic: 'Problem Solving & Data Ambiguity',
      question:
        'Tell me about a time during an academic project or hackathon when the dataset was messy, incomplete, or contradicted your initial hypothesis. How did you handle it?',
      difficulty: 'Entry',
      what_interviewer_is_testing:
        'Intellectual honesty, systematic debugging under time pressure, and resilience when initial assumptions fail.',
      key_points_to_include: [
        'Situation/Task: Set the context (e.g., university datathon or project dataset with unexpected anomalies).',
        'Action: Detail the diagnostic checks you ran in Python/SQL rather than forcing the data to fit a preconceived narrative.',
        'Result: Explain how pivoting to the verified data pattern produced a more accurate and defensible conclusion.',
      ],
      example_answer_structure:
        'STAR Framework: Situation (Project/Datathon context) → Task (Analytical goal) → Action (Systematic data profiling & hypothesis pivot) → Result (Verified insight delivered).',
    },
    {
      id: 'iq-beh-2',
      category: 'Behavioral',
      topic: 'Leadership & Teamwork',
      question:
        'How have you coordinated with team members who had different technical skill levels or conflicting ideas on how to approach a project?',
      difficulty: 'Entry',
      what_interviewer_is_testing:
        'Collaboration, empathy, task modularity, and communication clarity.',
      key_points_to_include: [
        'Draw on your experience coordinating campus analytics hackathons or group B.Tech projects.',
        'Show how you aligned the team around clear milestones (data cleaning, analysis, visualization/presentation) matched to each member’s strengths.',
        'Emphasize objective criteria (testing two approaches on a data sample) to resolve disagreements constructively.',
      ],
      example_answer_structure:
        'STAR Framework: Situation (Team project or club coordination) → Task (Shared deadline/objective) → Action (Role alignment & clear communication) → Result (Successful delivery).',
    },
    {
      id: 'iq-hr-1',
      category: 'HR',
      topic: 'Role Alignment & Career Strategy',
      question:
        'With a B.Tech in Data Science, why are you specifically targeting a Data Analyst role rather than a pure software engineering or research role?',
      difficulty: 'Entry',
      what_interviewer_is_testing:
        'Genuine motivation for business analytics, role clarity, and long-term commitment to solving business problems with data.',
      key_points_to_include: [
        'Emphasize your enthusiasm for the intersection of quantitative rigor (SQL, Python, Statistics) and immediate business decision-making.',
        'Connect your hands-on enjoyment of building the Sales Dashboard and analyzing Customer Churn to real commercial impact.',
        'Express how your B.Tech in Data Science gives you strong technical depth to automate pipelines and run rigorous statistical tests as a modern Data Analyst.',
      ],
      example_answer_structure:
        '1. Core motivation (bridging technical data and business strategy) → 2. Proof from your projects (Sales & Churn) → 3. How your Data Science degree adds value to their analytics team.',
    },
  ],
  jobAnalyses: SAMPLE_JOB_DESCRIPTIONS,
  activeJobAnalysisId: 'job-a-data-analyst',
  readiness: {
    overall_score: 76,
    skill_readiness: 82,
    portfolio_readiness: 70,
    resume_readiness: 68,
    interview_readiness: 78,
    explanation:
      'Your strongest area is technical skills (82/100) anchored by Python, SQL, Pandas, and Excel. Your biggest improvement opportunity is portfolio depth & resume quantification (68–70/100). Note: This score measures preparation completeness and is not an employment probability.',
    top_strength: 'SQL + Python',
    biggest_skill_gap: 'Business Intelligence & Statistical Case Analysis',
    recommended_flagship_project: 'Retail Sales Intelligence Platform',
    next_best_action_headline: 'Build one end-to-end SQL + Power BI project with quantified business KPIs.',
  },
  nextBestActions: [
    {
      priority: 1,
      title: 'Build & Publish the Retail Sales Intelligence Platform (SQL + Power BI)',
      impact_area: 'Portfolio Depth & BI Gap (+12 Readiness Pts)',
      estimated_effort: '12–15 hours (Weeks 2–3)',
      why_now:
        'Your current Sales Dashboard uses flat CSVs. Upgrading to a PostgreSQL + Star-Schema Power BI model with DAX time-intelligence directly closes your #1 target-role gap.',
      concrete_step:
        'Load a multi-table retail dataset into PostgreSQL, write 8 analytical CTE/window-function queries, and connect Power BI with a clean 1-to-many Star Schema.',
    },
    {
      priority: 2,
      title: 'Rewrite Resume Project Bullets Using ACTION + TECH + TASK + RESULT',
      impact_area: 'Resume Strength (+14 Resume Score Pts)',
      estimated_effort: '2 hours (This Week)',
      why_now:
        'Your resume currently scores 68/100 because project descriptions omit dataset scale and business findings.',
      concrete_step:
        'Open the Resume Analyzer tab, copy the 3 verified bullet rewrites, and insert your exact dataset row counts and key findings.',
    },
    {
      priority: 3,
      title: 'Complete 10 Timed SQL Window-Function & Cohort Interview Drills',
      impact_area: 'Technical Screening Readiness',
      estimated_effort: '4 hours (Week 1)',
      why_now:
        'Over 85% of entry-level Data Analyst interviews begin with a live SQL screen testing PARTITION BY, LAG/LEAD, and CTE aggregations.',
      concrete_step:
        'Practice the Q3 Regional Top-3 Customer query and Monthly Cohort Retention query in the Interview Preparation module.',
    },
  ],
  agentLogs: [
    {
      id: 'log-1',
      step: 'Resume analyzed',
      agent: 'Agent 1 · Resume Intelligence Agent',
      status: 'completed',
      timestamp: 'Completed',
      detail: 'Parsed B.Tech in Data Science profile, 8 technical skills, 2 projects (Sales Dashboard, Customer Churn Analysis), and Fresher experience level.',
    },
    {
      id: 'log-2',
      step: 'Skills extracted',
      agent: 'Agent 1 · Resume Intelligence Agent',
      status: 'completed',
      timestamp: 'Completed',
      detail: 'Verified Python, SQL, Excel, Statistics, Pandas, Power BI, and detected missing outcome metrics in project bullets.',
    },
    {
      id: 'log-3',
      step: 'Target role identified',
      agent: 'Agent 2 · Target Role Analysis Agent',
      status: 'completed',
      timestamp: 'Completed',
      detail: 'Mapped 12 competency categories for Data Analyst across Required, Important, and Nice to Have tiers.',
    },
    {
      id: 'log-4',
      step: 'Requirements mapped',
      agent: 'Agent 3 & 4 · Job Fit & Scoring Engine',
      status: 'completed',
      timestamp: 'Completed',
      detail: 'Evaluated candidate profile against 3 benchmark job descriptions using transparent 35/20/15/10/10/5/5 heuristic.',
    },
    {
      id: 'log-5',
      step: 'Skill gaps identified',
      agent: 'Agent 5 · Skill Gap Agent',
      status: 'completed',
      timestamp: 'Completed',
      detail: 'Prioritized 3 high-leverage gaps: Advanced Analytical SQL, Power BI Data Modeling (DAX), and Business Case Analysis.',
    },
    {
      id: 'log-6',
      step: 'Roadmap generated',
      agent: 'Agent 6, 7, 8 & 9 · Action & Prep Agents',
      status: 'completed',
      timestamp: 'Completed',
      detail: 'Generated 6-phase personalized roadmap (10 hrs/wk), 3 business-value projects, resume rewrites, and tailored interview questions.',
    },
  ],
};
