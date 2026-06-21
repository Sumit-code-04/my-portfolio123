export interface Profile {
  name: string;
  title: string;
  shortBio: string;
  profileImage: string; // Base64 or placeholder URL
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  gitHub: string;
  resumePdf: string; // Base64 or placeholder URL/text
}

export interface About {
  introduction: string;
  careerObjective: string;
  strengths: string[];
  languages: string[];
  interests: string[];
}

export interface Education {
  id: string;
  degree: string;
  college: string;
  university: string;
  year: string;
  cgpa: string;
  description: string;
}

export interface Skill {
  id: string;
  skillName: string;
  category: 'Technical Skills' | 'Management Skills' | 'Soft Skills';
  percentage: number;
}

export interface Project {
  id: string;
  projectTitle: string;
  category: 'React' | 'Python' | 'Flutter' | 'Civil' | 'MBA';
  description: string;
  objective: string;
  methodology: string;
  outcome: string;
  technologiesUsed: string[];
  gitHubLink: string;
  liveDemoLink: string;
  screenshots: string[]; // Base64 or URLs
  videoLink: string;
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  certificateImage: string; // Base64 or URL
  pdf: string; // Base64 or URL
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  description: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  image: string; // Base64 or URL
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  feedback: string;
  photo: string; // Base64 or URL
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SeoSettings {
  websiteTitle: string;
  metaDescription: string;
  keywords: string;
}
