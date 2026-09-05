import { ContactInfo, WorkExperience, Education, SkillGroup } from '../types';

export const contactInfo: ContactInfo = {
  name: "Ajie Rafli Pamungkas",
  title: "Data Scientist & Analytics Engineer",
  location: "Bekasi, Indonesia",
  phone: "+62 857-7046-0205",
  email: "ajirafli30@gmail.com",
  linkedin: "https://linkedin.com/in/ajie-rafli-pamungkas",
  github: "https://github.com/ajirafli30",
  summary: "Data Scientist & Analytics Engineer yang berdedikasi dan berorientasi pada hasil dengan minat tinggi di bidang Data Science, Data Analytics, dan Machine Learning. Berpengalaman dalam mengolah, menganalisis, dan menginterpretasikan data skala besar untuk menghasilkan insight strategis. Memiliki keahlian kuat dalam analisis statistik, predictive modeling, serta pengembangan solusi berbasis data menggunakan Python, SQL, dan ecosystem Machine Learning."
};

export const workExperiences: WorkExperience[] = [
  {
    id: "exp-1",
    role: "Junior Data Scientist",
    company: "PT Lintas Telematika Nusantara",
    location: "Tangerang, Indonesia",
    period: "Feb 2024 – Jun 2025",
    bullets: [
      "Menganalisis traffic jaringan untuk mengidentifikasi pola berbahaya dan aktivitas anomali.",
      "Mengembangkan Network Intrusion Detection System (NIDS) berbasis metode clustering.",
      "Mengolah dan membersihkan ratusan ribu data traffic jaringan yang diperoleh langsung dari server perusahaan.",
      "Berkolaborasi dengan tim engineer dalam mengintegrasikan model Machine Learning ke dalam infrastruktur produksi."
    ],
    skillsUsed: ["Python", "Machine Learning", "Clustering", "NIDS", "Data Cleaning", "Network Traffic Analysis", "MLOps"]
  },
  {
    id: "exp-2",
    role: "Profile Development",
    company: "PT Kenanga Care",
    location: "Bekasi, Indonesia",
    period: "Sep 2025 – Jun 2026",
    bullets: [
      "Mendesain dan mengembangkan website company profile sebagai media digital branding perusahaan.",
      "Melakukan text analysis dan clustering untuk mengidentifikasi strategi branding yang efektif.",
      "Menganalisis profil dan data kompetitor menggunakan pendekatan data-driven untuk mendukung keputusan bisnis."
    ],
    skillsUsed: ["Text Analysis", "Clustering", "Competitor Analytics", "Data-Driven Strategy", "Web Development"]
  },
  {
    id: "exp-3",
    role: "Data Scientist & Analyst",
    company: "Freelance",
    location: "Bekasi, Indonesia",
    period: "Jul 2022 – Sekarang",
    bullets: [
      "Berkolaborasi dengan klien untuk memahami kebutuhan bisnis dan menerjemahkannya menjadi solusi pemodelan data.",
      "Melakukan Exploratory Data Analysis (EDA) untuk menemukan pola, tren, dan insight utama.",
      "Membangun model predictive analytics dan menyampaikan rekomendasi bisnis melalui visualisasi data interaktif kepada stakeholder."
    ],
    skillsUsed: ["Python", "SQL", "Exploratory Data Analysis", "Predictive Analytics", "Tableau", "Power BI", "Stakeholder Presentation"]
  }
];

export const educations: Education[] = [
  {
    id: "edu-1",
    institution: "Universitas Pelita Bangsa",
    degree: "S1 Teknik Informatika",
    gpa: "3.53 / 4.00",
    period: "2021 – 2026",
    description: "Program sarjana berfokus pada rekayasa perangkat lunak, algoritma lanjutan, basis data, dan implementasi sistem kecerdasan buatan berbasis data.",
    focus: "Software Engineering, AI & Database Systems"
  },
  {
    id: "edu-2",
    institution: "HarvardX (edX)",
    degree: "Course — Data Science & Machine Learning",
    period: "Jul 2023 – Des 2023",
    description: "Sertifikasi komprehensif mencakup inferensi kausal, pemodelan statistik, evaluasi machine learning, dan implementasi deep neural networks.",
    focus: "Data Science, Machine Learning, Deep Learning, Causal Inference & Statistics"
  },
  {
    id: "edu-3",
    institution: "Kaggle",
    degree: "Course — Machine Learning & Data Visualization",
    period: "2023 – 2024",
    description: "Sertifikasi komprehensif mencakup: (1) Intro to Machine Learning, (2) Intermediate Machine Learning, (3) Data Visualization, dan (4) Machine Learning Explainability.",
    focus: "Intro to Machine Learning, Intermediate Machine Learning, Data Visualization, Machine Learning Explainability"
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    iconName: "Code2",
    skills: ["Python", "SQL", "R"]
  },
  {
    category: "Machine Learning & AI",
    iconName: "BrainCircuit",
    skills: ["Scikit-learn", "TensorFlow", "PyTorch", "XGBoost", "LightGBM", "LangChain / GraphRAG"]
  },
  {
    category: "Data Engineering",
    iconName: "DatabaseZap",
    skills: ["Apache Spark", "Hadoop", "ETL / ELT Pipelines"]
  },
  {
    category: "Cloud & Databases",
    iconName: "Cloud",
    skills: ["Google Cloud Platform (GCP)", "BigQuery", "PostgreSQL", "MongoDB", "Neo4j"]
  },
  {
    category: "Data Visualization",
    iconName: "BarChart3",
    skills: ["Power BI", "Tableau", "Plotly", "Matplotlib", "Seaborn"]
  },
  {
    category: "Tools & Infrastructure",
    iconName: "Wrench",
    skills: ["Git", "Jupyter", "Linux"]
  }
];

export const spokenLanguages = [
  { language: "Bahasa Indonesia", level: "Native" },
  { language: "Bahasa Inggris", level: "Proficient" }
];
