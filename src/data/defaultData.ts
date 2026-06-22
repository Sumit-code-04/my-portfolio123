import {
  Profile,
  About,
  Education,
  Skill,
  Project,
  Certificate,
  Experience,
  Achievement,
  Blog,
  Testimonial,
  SeoSettings
} from '../types';

export const defaultProfile: Profile = {
  name: "Radhika Rathod",
  title: "MBA Professional & B.Tech Civil Graduate",
  shortBio: "A dynamic hybrid professional bridging Technical Engineering rigor and Strategic Management capabilities. HR enthusiast, agile planner, and natural problem-solver.",
  profileImage: "sister pic132.jpeg",
  email: "rathodradhika446@gmail.com",
  phone: "+91 8459739450",
  address: "Chh.sambhaji nagar, Maharashtra, India",
  linkedIn: "https://www.linkedin.com/in/radhika-rathod-5b2442230/",
  gitHub: "https://github.com/arjunsharma-eng",
  resumePdf: "data:application/pdf;base64,JVBERi0xLjQKJSDi48cl..." // Dummy base64 placeholder
};

export const defaultAbout: About = {
  introduction: "I am Radhika Rathod, a uniquely positioned Management Professional with a solid foundation in Civil Engineering (B.Tech) followed by advanced business administration analytics in MBA. This dual perspective equips me with robust analytical precision, structural execution discipline, and advanced strategic human resources management skills.",
  careerObjective: "To leverage critical analytical research and structural planning methodologies in a versatile Management or Executive HR role, contributing to operational efficiency and high-performing team scaling.",
  strengths: [
    "Cross-functional Team Leadership",
    "Data-Driven Organizational Management",
    "Project Feasibility & Budget Optimization",
    "Talent Acquisition & Employee Engagement",
    "Agile Conflict Resolution"
  ],
  languages: [
    "English (Professional)",
    "Hindi (Native)",
    "German (Elementary)"
  ],
  interests: [
    "Organizational Architecture",
    "Landscape and Sustainable Civil Design",
    "Tech Product Strategy",
    "Data Analytics & Visualizations"
  ]
};

export const defaultEducation: Education[] = [
  {
    id: "edu_1",
    degree: "Master of Business Administration (MBA)",
    college: "School of Management Studies",
    university: "State University",
    year: "2024 - 2026",
    cgpa: "3.85 / 4.0",
    description: "Specialized in Human Resource Management & Organizational Operations. Core coursework includes Strategic Recruitment Analytics, Operations Research, Corporate Governance, and Talent Ecosystem Design."
  },
  {
    id: "edu_2",
    degree: "B.Tech in Civil Engineering",
    college: "College of Science & Engineering",
    university: "National Institute of Science",
    year: "2020 - 2024",
    cgpa: "8.9 / 10.0",
    description: "Graduated with honors. Developed rigorous technical blueprints, performed stress and strain analysis, and conceptualized modern project management lifecycles. Led the Civil Infrastructure Student Association."
  }
];

export const defaultSkills: Skill[] = [
  // Management
  { id: "sk_1", skillName: "HR Strategy & Talent Management", category: "Management Skills", percentage: 95 },
  { id: "sk_2", skillName: "Project Scheduling & Budgeting", category: "Management Skills", percentage: 90 },
  { id: "sk_3", skillName: "Conflict Resolution & Negotiation", category: "Management Skills", percentage: 88 },
  // Technical
  { id: "sk_4", skillName: "Civil Planning & GIS Mapping", category: "Technical Skills", percentage: 85 },
  { id: "sk_5", skillName: "Data Analytics (Python / Excel)", category: "Technical Skills", percentage: 80 },
  { id: "sk_6", skillName: "React Framework & Web Dashboards", category: "Technical Skills", percentage: 75 },
  // Soft
  { id: "sk_7", skillName: "Empathetic Communication", category: "Soft Skills", percentage: 98 },
  { id: "sk_8", skillName: "Critical & Analytical Thinking", category: "Soft Skills", percentage: 92 },
  { id: "sk_9", skillName: "Adaptability & Crisis Response", category: "Soft Skills", percentage: 90 }
];

export const defaultProjects: Project[] = [
  {
    id: "proj_1",
    projectTitle: "Automated HR Talent Intake Portal",
    category: "React",
    description: "Developed a modern recruitment screening application utilizing React to parse and score resume metrics dynamically. Includes intuitive search matrices, status progression pipelines, and custom automated email template triggers.",
    objective: "To streamline early-phase resume screening from hours into seconds using customized scoring engines.",
    methodology: "Implemented localized file parsers in highly parallel JS frameworks, matching skills with predefined weights in a responsive layout.",
    outcome: "Increased HR candidate transition speeds by 40% with clean analytics visualizers built in React.",
    technologiesUsed: ["React", "Tailwind CSS", "Local Storage", "Framer Motion", "Lucide React"],
    gitHubLink: "https://github.com/arjunsharma-eng/talent-intake",
    liveDemoLink: "#demo",
    screenshots: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    ],
    videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "proj_2",
    projectTitle: "Predictive Concrete Stress Metrics Suite",
    category: "Python",
    description: "Engineered a predictive analysis system utilizing numeric regression in Python to model cement structural wear and lifetime integrity based on composition weight ratios and humidity forecasts.",
    objective: "Create safety-first civil estimates minimizing physical stress testing material waste.",
    methodology: "Developed simple linear and polynomial regressions on historical structural databases and packaged it into a responsive visual app.",
    outcome: "Reduced concrete test trial costs by 24% across standard modular construction prototypes.",
    technologiesUsed: ["Python", "Numpy", "Streamlit", "Matplotlib"],
    gitHubLink: "https://github.com/arjunsharma-eng/concrete-predict",
    liveDemoLink: "#demo",
    screenshots: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80"
    ],
    videoLink: ""
  },
  {
    id: "proj_3",
    projectTitle: "Strategic MBA Workforce Planning Simulator",
    category: "MBA",
    description: "Conducted deep research and structured a comprehensive analytical simulation demonstrating workforce planning optimization for global technical manufacturing hubs experiencing varying supply-chain crises.",
    objective: "Address talent retention issues under challenging structural material cost inflation.",
    methodology: "Built robust interactive spreadsheets containing predictive workforce supply-demand templates, analyzing employee attrition reasons.",
    outcome: "Presented actionable organizational change proposals accepted by a regional manufacturing consortium.",
    technologiesUsed: ["Excel Analytics", "Statistical Modeling", "Strategic Planning", "Scenario Analysis"],
    gitHubLink: "",
    liveDemoLink: "#demo",
    screenshots: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
    ],
    videoLink: ""
  }
];

export const defaultCertificates: Certificate[] = [
  {
    id: "cert_1",
    title: "Strategic Talent Acquisition Certification",
    organization: "Association of HR Managers",
    date: "November 2025",
    description: "Mastered end-to-end recruitment lifecycle pipelines, candidate scoring models, behavioral interview methodologies, and labor compliance standard metrics.",
    certificateImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80",
    pdf: ""
  },
  {
    id: "cert_2",
    title: "Project Management Professional (PMP) Essentials",
    organization: "Global Planning Institute",
    date: "July 2024",
    description: "Advanced certification covering structural milestones, cost estimates, agile sprint cycles, resource leveling, and risk register management in technical industries.",
    certificateImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    pdf: ""
  }
];

export const defaultExperience: Experience[] = [
  {
    id: "exp_1",
    company: "Apex Infrastructures Ltd.",
    role: "Project Planning Intern & Assistant Manager",
    duration: "June 2025 - August 2025",
    responsibilities: [
      "Collaborated with executive directors to deploy a dynamic scheduling template, achieving 100% on-time milestone reporting for a major multi-municipal commercial site.",
      "Facilitated on-site cross-functional coordination between 70+ engineering staff and corporate human resources to resolve productivity bottleneck patterns.",
      "Analyzed contractor pricing curves and optimized supply matrices, resulting in budget savings of approximately $12,000."
    ]
  },
  {
    id: "exp_2",
    company: "State Civil Authority",
    role: "Graduate Engineering Apprentice",
    duration: "June 2023 - May 2024",
    responsibilities: [
      "Drafted primary architectural blueprints and environmental clearance reports for urban transit extensions.",
      "Evaluated material density logs, ensuring structural safety alignments with regional geophysics standards.",
      "Spearheaded technical knowledge-sharing workshops for newly hired draftsmen to boost tooling masteries."
    ]
  }
];

export const defaultAchievements: Achievement[] = [
  {
    id: "ach_1",
    title: "National MBA Business Simulation League - First Runner Up",
    year: "2025",
    description: "Outperformed 140 representing business schools in a highly simulated market environment modeling complex talent hiring, product capital investments, and capacity stress tests."
  },
  {
    id: "ach_2",
    title: "Dean's Award for Technical Architecture Innovation",
    year: "2023",
    description: "Awarded top honors for conceptualizing a low-cost, eco-sustainable water filtering concrete filter system for rural disaster Relief Zones."
  }
];

export const defaultBlogs: Blog[] = [
  {
    id: "blog_1",
    title: "Bridging the Gap: Why Engineering Minds Excel in Management Roles",
    category: "Professional Growth",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    description: "Explore the profound synergy when structural engineering logic merges with empathetic people management. We discuss structured decision frameworks, risk calculations, and organizational culture building.",
    tags: ["MBA", "Engineering", "Career Path", "Management"]
  },
  {
    id: "blog_2",
    title: "The Future of Recruitment: Data Analytics in Technical HR Operations",
    category: "Human Resources",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    description: "An in-depth analysis on how standard statistical distributions and regression models can optimize candidate retention matrices, elevate cultural onboarding, and predict developer hiring fits.",
    tags: ["HR Analytics", "Recruitment", "People Strategy", "Future of Work"]
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "test_1",
    name: "Dr. Vivek Mehra",
    position: "Professor of Organizational Behavior, SMS",
    feedback: "Arjun exemplifies a rare breed of student. His approach to complex case analyses blends structural analytical logic from his engineering days with brilliant, human-centered emotional intelligence.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "test_2",
    name: "Sarah Jenkins",
    position: "Senior Director, Apex Infrastructures",
    feedback: "During his internship, Arjun brought order to chaotic project schedules. His structural engineering skills meant he understood the blueprints, but his management affinity meant he was the one keeping the teams aligned.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  }
];

export const defaultSeoSettings: SeoSettings = {
  websiteTitle: "Radhika Rathod | Portfolios & Strategic Profile",
  metaDescription: "Professional Portfolio of radhika Rathod: MBA specialized in HR & Operations & Civil Engineering Graduate. View projects, certificates, competencies, and career records.",
  keywords: "Radhika Rathod, MBA portfolio, Civil Engineer HR, Management professional portfolio, recruiter-ready website, B.Tech Civil, State University"
};
