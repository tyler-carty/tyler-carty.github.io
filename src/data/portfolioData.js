/**
 * Portfolio Data Structure
 *
 * This file contains all the content for the portfolio website.
 * To update any information, simply edit the values in this file.
 *
 * Structure:
 * - personalInfo: Basic information and social links
 * - experience: Work history in reverse chronological order
 * - projects: Portfolio projects with categories
 * - skills: Organized by category
 * - education: Academic background
 */

export const portfolioData = {
  // ============================================
  // PERSONAL INFORMATION
  // ============================================
  personalInfo: {
    name: "Tyler Cartwright",
    title: "Data Scientist | Freelance Solutions Developer",
    email: "tylercartwright2606@gmail.com",
    location: "United Kingdom",
    tagline: "Building intelligent systems that solve real-world problems. Specializing in machine learning, cloud architecture, and data engineering.",
    resumeUrl: "/resume.pdf",
    links: {
      github: "https://github.com/tyler-carty",
      linkedin: "https://linkedin.com/in/tyler-reece-cartwright",
    }
  },

  // ============================================
  // WORK EXPERIENCE
  // ============================================
  experience: [
    {
      id: 1,
      company: "Lloyds Banking Group",
      role: "Data Scientist",
      period: "May 2025 - Present",
      location: "United Kingdom",
      team: "Economic Crime Prevention Platform",
      description: "Leading data science initiatives to combat financial crime through advanced analytics and machine learning.",
      achievements: [
        "Developing ML models for fraud detection and prevention",
        "Building scalable data pipelines for real-time transaction monitoring",
        "Collaborating with cross-functional teams to implement AI-driven solutions"
      ],
      technologies: ["Python", "Machine Learning", "Data Analytics", "Cloud Platforms"]
    },
    {
      id: 2,
      company: "Lloyds Banking Group",
      role: "Data Engineer",
      period: "Sept 2024 - May 2025",
      location: "United Kingdom",
      team: "Economic Crime Prevention Platform",
      description: "Built and maintained data infrastructure supporting fraud detection systems.",
      achievements: [
        "Designed and implemented ETL pipelines processing millions of transactions daily",
        "Optimized data warehouse queries improving performance by 40%",
        "Developed automated data quality monitoring systems"
      ],
      technologies: ["Python", "SQL", "Apache Spark", "AWS", "Data Warehousing"]
    },
    {
      id: 3,
      company: "Lloyds Banking Group",
      role: "Cloud Software Engineer (Internship)",
      period: "June 2022 - Sept 2023",
      location: "United Kingdom",
      team: "Homes Platform",
      description: "Contributed to cloud-native applications supporting mortgage services.",
      achievements: [
        "Developed microservices using modern cloud architecture patterns",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Collaborated on API design and documentation"
      ],
      technologies: ["Java", "Spring Boot", "AWS", "Docker", "Kubernetes", "CI/CD"]
    }
  ],

  // ============================================
  // FREELANCE PROJECTS
  // ============================================
  freelanceExperience: [
    {
      id: 1,
      client: "Hodsock Priory & Prestwold Hall",
      project: "Staff Management System",
      period: "June 2024 - May 2025",
      description: "Developed a comprehensive staff management platform for event venues.",
      achievements: [
        "Built full-stack web application with real-time scheduling capabilities",
        "Implemented role-based access control and automated reporting",
        "Reduced administrative overhead by 50% through automation"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
    }
  ],

  // ============================================
  // PROJECTS
  // ============================================
  projects: [
    {
      id: 1,
      title: "Staff Management System",
      category: "Freelance",
      description: "Full-stack staff scheduling and management platform for event venues. Features include shift scheduling, automated reporting, and mobile-responsive design.",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      github: null, // Private client work
      demo: null,
      featured: true
    },
    {
      id: 2,
      title: "Economic Crime ML Models",
      category: "Work",
      description: "Machine learning models for fraud detection and prevention, processing millions of transactions in real-time.",
      technologies: ["Python", "TensorFlow", "Apache Spark", "AWS"],
      github: null, // Proprietary
      demo: null,
      featured: true
    },
    {
      id: 3,
      title: "Data Pipeline Architecture",
      category: "Work",
      description: "Scalable ETL pipelines for real-time transaction monitoring and data warehousing.",
      technologies: ["Python", "Apache Airflow", "Spark", "AWS Glue"],
      github: null, // Proprietary
      demo: null,
      featured: true
    },
    // Add more personal projects here as needed
    {
      id: 4,
      title: "Portfolio Website",
      category: "Personal",
      description: "Modern, responsive portfolio website built with React and Tailwind CSS.",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/tyler-carty/tyler-carty.github.io",
      demo: "https://tylercartwright.co.uk",
      featured: false
    }
  ],

  // ============================================
  // SKILLS
  // ============================================
  skills: {
    languages: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "SQL",
      "R"
    ],
    cloud: [
      "AWS (Lambda, S3, EC2, Glue, Redshift)",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform"
    ],
    dataScience: [
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy"
    ],
    dataEngineering: [
      "Apache Spark",
      "Apache Airflow",
      "ETL Pipelines",
      "Data Warehousing",
      "PostgreSQL",
      "MongoDB"
    ],
    webDevelopment: [
      "React",
      "Node.js",
      "Express",
      "REST APIs",
      "GraphQL",
      "Spring Boot"
    ],
    tools: [
      "Git",
      "CI/CD",
      "Jenkins",
      "GitHub Actions",
      "JIRA",
      "Agile/Scrum"
    ]
  },

  // ============================================
  // EDUCATION
  // ============================================
  education: [
    {
      id: 1,
      institution: "University of Derby",
      degree: "BSc Computer Science",
      grade: "First Class Honours",
      period: "2020 - 2024",
      achievements: [
        "Dean's Award recipient (all years)",
        "Specialized in Machine Learning and Data Science",
        "Final year project: Advanced ML techniques for predictive analytics"
      ]
    }
  ]
};

export default portfolioData;
