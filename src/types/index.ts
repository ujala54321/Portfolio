export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  techStack: string[];
}

export interface SkillItem {
  name: string;
  level: number; // percentage 0 - 100
  iconName?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  features: string[];
  architecture: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Microsoft' | 'AI' | 'Academic' | 'Achievement';
  image: string;
  description: string;
  skillsLearned: string[];
  credentialId?: string;
  credentialUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Office' | 'Campus' | 'Corporate' | 'Events';
  image: string;
  description: string;
  date: string;
}

export interface BeyondCodingItem {
  id: string;
  title: string;
  icon: string;
  badge: string;
  description: string;
  keyTakeaways: string[];
  gradient: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  fieldOfStudy: string;
  grade?: string;
  highlights: string[];
}

export interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  badge: string;
  code: string;
  description: string;
}
