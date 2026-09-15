export const PROFILE = {
  name: "Achmad Faiz",
  title: "Performance Management & People Analytics",
  location: "Jakarta, Indonesia",
  email: "achmad.f.faiz@gmail.com",
  linkedin: "https://linkedin.com/in/achmadf18",
  linkedinLabel: "linkedin.com/in/achmadf18",
  phone: "+62 822 7494 4294",
  cvPath: "/ACHMAD%20FAIZ%20Resume%205.1%20.pdf",
  summary:
    "Performance Management and People Analytics professional with 7+ years helping HR building data infrastructure, analytics, and internal tools from the ground up. Built GoTo's Performance Management function; combines deep people-data analytics with the ability to design and ship the tools that deliver it — including the 360 Performance Management System, calibration analytics, and PIP and Critical Talent modules. Strong in SQL, BigQuery, Tableau, Looker, and in addition R Studio.",
} as const;

export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const EXPERIENCE = [
  {
    title: "Performance Management, People Analytics",
    company: "GoTo HoldCo",
    dates: "December 2019 – Present",
    location: "Jakarta, Indonesia",
    bullets: [
      "Built and led GoTo's Performance Management System function, owning performance analytics end-to-end and translating large-scale people data into executive narratives for CHRO-level and PAC leadership.",
      "Designed and implemented calibration analytics that surfaced rating distribution patterns and manager quality across +3,000 employees / +800 managers, directly informing GoTo's performance improvement strategy.",
      "Built and maintained the performance data infrastructure (Dataworks and PostgreSQL) powering a real-time dashboard with automated refresh every 15 minutes during active cycles, cutting manual reporting from 2–3 hours daily to about 1 hour per week.",
      "Developed R-based verbatim analysis (AI-assisted) that processed 10,000+ performance review responses, extracting themes that shaped learning material and performance improvement redesign.",
      "Led cross-functional work with Engineering and Product to design and ship internal tools (360 performance system, PIP module, Critical Talent app), acting as system analyst and product owner.",
    ],
  },
  {
    title: "Talent Acquisition Analytics (concurrent)",
    company: "GoTo HoldCo",
    dates: "June 2025 – Present",
    location: "Jakarta, Indonesia",
    bullets: [
      "Own recruitment and hiring-funnel analytics across all stages in Lever ATS, giving TA and leads end-to-end pipeline visibility.",
      "Built an automated onboarding tracker that pulls Lever ATS data via API and refreshes daily, replacing HR Services' manual process and saving an average of 3–4 hours per day.",
      "Oversee semi-annual Lever ATS enhancements to support TA initiatives and keep the hiring system aligned with evolving recruitment needs.",
    ],
  },
  {
    title: "Business Analyst",
    company: "GoTo GoPay",
    dates: "January 2019 – December 2019",
    location: "Jakarta, Indonesia",
    bullets: [
      "Analyzed full-funnel business performance across merchant acquisition, transactions, and retention, delivering weekly insights to operational leadership.",
      "Built real-time performance dashboards in Metabase and Google Data Studio to monitor merchant and transaction KPIs across regions.",
      "Led fraud pattern detection by integrating Salesforce CRM and BigQuery data, identifying anomalous transaction behavior and supporting risk mitigation.",
      "Served as first-level data reviewer for the Sales Performance team, validating merchant transactions before escalation to Fraud and Risk.",
    ],
  },
  {
    title: "Product Research Intern",
    company: "GoTo GoPay",
    dates: "October 2018 – December 2018",
    location: "Jakarta, Indonesia",
    bullets: [
      "Supported qualitative research (IDI, FGD, usability testing) to surface user insights, including KYC flow testing within the Gojek app.",
      "Recruited and managed research participants, then synthesized findings into structured insight reports informing product improvements.",
    ],
  },
  {
    title: "Competitive Intelligence Analyst",
    company: "Uber Indonesia, Driver Ops",
    dates: "July 2017 – July 2018",
    location: "Medan, Indonesia",
    bullets: [
      "Led the Medan competitive intelligence team, gathering market insights on competitive dynamics between Uber, Gojek, and Grab.",
      "Designed and ran on-field surveys and recruited competitor drivers to collect data on app experience, incentives, and usability; synthesized findings into strategic reports for product and ops decisions.",
    ],
  },
] as const;

export const PROJECTS = [
  {
    title: "360 Performance System, GoTo HoldCo",
    org: "GoTo HoldCo",
    year: "2022",
    bullets: [
      "Led the 360 Performance System as product manager, owning the process design, product requirements, and QA, and partnering with an IT engineer on development.",
      "Defined the process flows, then ran UAT and drove rollout and onboarding for HR teams.",
    ],
  },
  {
    title: "PAC Data Warehouse",
    org: "GoTo HoldCo",
    year: "2022",
    bullets: [
      "Led the integration of fragmented HR data sources into a centralized BigQuery warehouse, enabling self-service analytics for HR teams.",
      "Established data standards, source documentation, and update cadences to ensure reliability and accessibility.",
    ],
  },
  {
    title: "Merchant Acquisition & Transaction Fraud Analysis",
    org: "GoTo GoPay",
    year: "2019",
    bullets: [
      "Defined fraud detection metrics across the acquisition-to-transaction journey and identified anomalous patterns to target eligible merchants for cashback programs, improving incentive accuracy and reducing fraud exposure.",
    ],
  },
] as const;

export const SKILLS = [
  {
    group: "People Analytics & HR",
    items: [
      "Performance Management",
      "Calibration Analytics",
      "Talent Acquisition Analytics",
      "Employee Lifecycle Analytics",
    ],
  },
  {
    group: "Analytics & Data",
    items: [
      "SQL",
      "PostgreSQL",
      "BigQuery",
      "Dataworks",
      "R / RStudio",
      "Google Sheets",
      "DBeaver",
    ],
  },
  {
    group: "Visualization & BI",
    items: [
      "Tableau",
      "Looker",
      "Metabase",
      "Google Data Studio",
      "Quick-BI",
    ],
  },
  {
    group: "HR Tech & Product",
    items: ["Workday", "Lever ATS", "Figma", "Google Workspace"],
  },
  {
    group: "Methods",
    items: [
      "Funnel Analysis",
      "Cohort Analysis",
      "Behavioral Analytics",
      "Text / Verbatim Analytics",
      "UAT",
      "Fraud Checking",
    ],
  },
  {
    group: "Languages",
    items: ["English (Professional)", "Bahasa Indonesia (Native)"],
  },
] as const;

export const EDUCATION = {
  school: "Universitas Sumatera Utara",
  degree: "D3 Teknik Informatika",
  dates: "2013 – 2016",
  gpa: "3.30",
} as const;

export const CERTIFICATION = {
  name: "Gojek Business Intelligence University, Advanced Stream",
  year: "2019",
} as const;
