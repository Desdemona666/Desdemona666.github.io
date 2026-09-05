export interface ContactInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  skillsUsed: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  gpa?: string;
  period: string;
  description?: string;
  focus?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
  iconName: string;
}

export type ProjectCategory = 
  | 'GenAI & NLP'
  | 'Time Series & Forecasting'
  | 'Predictive Modeling'
  | 'Data Engineering & Streaming'
  | 'Operations & Analytics';

export interface ArchitectureNode {
  step: number;
  name: string;
  desc: string;
  tool: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
  helper?: string;
}

export interface MathFormulaDefinition {
  title: string;
  latex: string;
  explanation: string;
  variables?: { symbol: string; meaning: string }[];
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  readTime: string;
  date: string;
  featured: boolean;
  shortDescription: string;
  techStack: string[];
  metrics: ProjectMetric[];
  
  // Detailed Blog Documentation Sections
  executiveSummary: string;
  businessProblem: string;
  challenges: string[];
  architecture: {
    title: string;
    flowDescription: string;
    nodes: ArchitectureNode[];
  };
  mathFormulas?: MathFormulaDefinition[];
  dataset: {
    source: string;
    volume: string;
    keyFeatures: string[];
    preprocessing: string[];
  };
  methodology: {
    phase: string;
    description: string;
    details: string[];
  }[];
  interactiveType?: 
    | 'graph-rag' 
    | 'chili-forecast' 
    | 'churn-calculator' 
    | 'nids-clustering'
    | 'dynamic-pricing'
    | 'fraud-stream'
    | 'supply-chain'
    | 'clinical-nlp';
  codeSnippet: {
    language: string;
    filename: string;
    description: string;
    code: string;
  };
  resultsAndImpact: string[];
  businessROI: string;
  lessonsLearned: string[];
  futureRoadmap: string[];
}
