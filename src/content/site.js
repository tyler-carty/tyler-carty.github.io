// Single source of truth for all site content, copy, and scroll choreography.
// Facts and figures ported from the previous portfolioData.js.

export const site = {
  meta: {
    title: 'Tyler Cartwright — Machine Learning Engineer',
    description:
      "I build the systems that catch financial crime — machine learning that finds the handful of transactions that matter, hidden in millions that don't.",
    url: 'https://tylercartwright.co.uk',
  },

  person: {
    name: 'Tyler Cartwright',
    role: 'Machine Learning Engineer',
    org: 'Lloyds Banking Group',
    email: 'tcartwright2606@gmail.com',
    links: {
      github: 'https://github.com/tyler-carty',
      linkedin: 'https://linkedin.com/in/tyler-reece-cartwright',
    },
    cvPath: '/cv/Tyler-Cartwright-CV.pdf',
  },

  hero: {
    eyebrow: 'TYLER CARTWRIGHT — MACHINE LEARNING ENGINEER · LLOYDS BANKING GROUP',
    headline: 'Signal from noise.',
    subline:
      "I build the systems that catch financial crime — machine learning that finds the handful of transactions that matter, hidden in millions that don't.",
    annotation: '// economic crime prevention platform',
  },

  prologue: {
    lines: [
      'Every day, millions of transactions move through the bank. Almost all of them are ordinary. My job is the ones that aren’t.',
      'Four roles, one problem: find the signal.',
    ],
  },

  chapters: [
    {
      id: 'foundations',
      railLabel: 'FOUNDATIONS',
      kicker: 'CH.01 — CLOUD SOFTWARE ENGINEER · HOMES PLATFORM · 2022–2023',
      headline: 'First, learn how systems fail.',
      body: 'A placement year on Lloyds’ Homes Platform, building cloud-native systems behind mortgage services — then back to finish a First-Class degree. The lesson that stuck: you can’t catch what you can’t see.',
      achievements: [
        'Built incident detection in Azure that cut response times from hours to minutes',
        'Migrated a central microservices application to Azure for scalability and reliability',
        'Automated health checks and alerting, halving application downtime',
      ],
      metric: { type: 'text', display: 'hours → minutes', label: 'INCIDENT RESPONSE TIME' },
      secondaryStats: [{ value: '-50%', label: 'DOWNTIME' }],
      tech: ['JavaScript', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
      scene: 'grid',
    },
    {
      id: 'pipeline',
      railLabel: 'THE PIPELINE',
      kicker: 'CH.02 — DATA ENGINEER · ECONOMIC CRIME PREVENTION · 2024–2025',
      headline: 'Move millions of transactions. Waste nothing.',
      body: 'Joined the Economic Crime Prevention Platform to build the data infrastructure fraud detection runs on — ETL pipelines moving millions of transactions a day, feeding the models that hunt for crime.',
      achievements: [
        'Designed and ran Spark ETL pipelines processing millions of transactions daily',
        'Introduced 100+ new data points to the warehouse, directly improving model accuracy',
        'Optimised Spark applications for performance and cost',
      ],
      metric: { type: 'count', value: 500000, format: 'gbp-compact', label: 'SAVED PER YEAR — SPARK OPTIMISATION' },
      secondaryStats: [
        { value: 'MILLIONS', label: 'TRANSACTIONS / DAY' },
        { value: '+100', label: 'DATA POINTS ADDED' },
      ],
      tech: ['Python', 'SQL', 'Apache Spark', 'GCP', 'Data Warehousing'],
      scene: 'streams',
    },
    {
      id: 'models',
      railLabel: 'THE MODELS',
      kicker: 'CH.03 — DATA SCIENTIST · ECONOMIC CRIME PREVENTION · 2025–2026',
      headline: 'Teach the machine what crime looks like.',
      body: 'Moved from building the pipes to building the brains: two machine learning models for anti-money-laundering and fraud detection. Better detection without more alerts — precision, not noise.',
      achievements: [
        'Developed two ML models for AML and fraud detection',
        'Improved detection rates by 50% per model — without increasing alert volume',
        'Each model recovers an additional £100,000 every month',
      ],
      metric: {
        type: 'dual',
        primary: { type: 'count', value: 50, format: 'percent-plus', label: 'DETECTION RATE, SAME ALERT VOLUME' },
        secondary: { type: 'count', value: 100000, format: 'gbp-compact', label: 'RECOVERED PER MODEL, PER MONTH' },
      },
      secondaryStats: [],
      tech: ['Python', 'Machine Learning', 'Data Analytics', 'GCP'],
      scene: 'anomaly',
    },
    {
      id: 'production',
      railLabel: 'PRODUCTION',
      kicker: 'CH.04 — MACHINE LEARNING ENGINEER · ECONOMIC CRIME PREVENTION · 2026–NOW',
      headline: 'From notebook to systems that never sleep.',
      body: 'Now the team’s first Machine Learning Engineer — the bridge between experimentation and production. Notebook models become auditable, scalable pipelines on Vertex AI; shared tooling becomes the standard across every model sub-team.',
      achievements: [
        'Own the team’s shared Python utilities package, standardising workflows across model sub-teams',
        'Productionising fraud detection models on Vertex AI — notebook experiments to industry-standard pipelines',
        'Enabling scalable, auditable batch inference at production scale',
      ],
      metric: {
        type: 'status',
        lines: ['STATUS: IN PRODUCTION', 'PIPELINE: VERTEX AI · BATCH', 'ROLE: FIRST MLE ON TEAM'],
      },
      secondaryStats: [],
      tech: ['Python', 'GCP', 'Vertex AI', 'MLOps'],
      scene: 'production',
    },
  ],

  // Particle scenes anchored to page sections; the engine measures each
  // anchor's position to derive scroll boundaries, so scene changes stay
  // aligned with the narrative at any viewport size.
  sceneTimeline: [
    { scene: 'noise', anchor: 'hero' },
    { scene: 'grid', anchor: 'foundations' },
    { scene: 'streams', anchor: 'pipeline' },
    { scene: 'anomaly', anchor: 'models' },
    { scene: 'production', anchor: 'production' },
    { scene: 'constellation', anchor: 'contact' },
  ],

  projects: {
    kicker: '04 — OFF THE CLOCK',
    headline: 'Off the clock.',
    sub: 'The same instinct — build the system, remove the toil — applied elsewhere.',
    items: [
      {
        index: '01',
        title: 'Staff Management System',
        client: 'Hodsock Priory & Prestwold Hall · Freelance',
        description:
          'Full-stack shift-tracking and payroll platform for two event venues — role-based access, automated reporting, and an end to manual admin.',
        metricChip: '-95% admin overhead',
        tech: ['React', 'Node.js'],
        links: {},
      },
      {
        index: '02',
        title: 'WaniKani Stats Tracker',
        client: 'Open source · PWA',
        description:
          'A progress-visualisation app for Japanese learners, shared with and used by thousands to stay motivated.',
        metricChip: 'Thousands of users',
        tech: ['TypeScript', 'PWA', 'GitHub Actions'],
        links: {
          github: 'https://github.com/tyler-cartwright/wanikani-stats-tracker',
          demo: 'https://tyler-cartwright.github.io/wanikani-stats-tracker/',
        },
      },
      {
        index: '03',
        title: 'This site',
        client: 'Open source',
        description:
          'A scroll-driven story rendered over a hand-rolled canvas particle engine. No trackers, no framework bloat — view the source.',
        metricChip: 'React + Canvas 2D',
        tech: ['React', 'Vite', 'Canvas'],
        links: {
          github: 'https://github.com/tyler-carty/tyler-carty.github.io',
        },
      },
    ],
  },

  education: {
    kicker: 'EDUCATION',
    headline: 'Where the signal-hunting started.',
    institution: 'University of Derby',
    degree: 'BSc Computer Science',
    grade: 'First Class Honours',
    period: '2020–2024',
    notes: [
      'Dean’s Award recipient — every year',
      'Specialised in Machine Learning and Data Science',
      'Final-year project: mining sentiment signal from the noise of Reddit during the GameStop craze',
    ],
  },

  toolkit: {
    kicker: 'TOOLKIT',
    headline: 'Capabilities.',
    groups: [
      { label: 'LANGUAGES', items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Java'] },
      { label: 'CLOUD & MLOPS', items: ['GCP', 'Vertex AI', 'Azure', 'Docker', 'Kubernetes', 'Terraform'] },
      { label: 'DATA & ML', items: ['Apache Spark', 'BigQuery', 'Scikit-learn', 'LightGBM', 'PyTorch', 'ETL Pipelines'] },
      { label: 'WEB', items: ['React', 'Node.js', 'Express', 'REST APIs'] },
      { label: 'PRACTICES', items: ['Git', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Agile/Scrum'] },
    ],
  },

  contact: {
    kicker: '05 — CONTACT',
    headline: 'Looking for signal?',
    sub: "I'm always happy to talk ML engineering, fraud systems, or interesting problems.",
  },

  nav: [
    { id: 'hello', label: '00 HELLO', target: 'hero' },
    { id: 'foundations', label: '01 FOUNDATIONS', target: 'foundations' },
    { id: 'pipeline', label: '02 PIPELINE', target: 'pipeline' },
    { id: 'models', label: '03 MODELS', target: 'models' },
    { id: 'production', label: '04 PRODUCTION', target: 'production' },
    { id: 'contact', label: '05 CONTACT', target: 'contact' },
  ],
}

export default site
