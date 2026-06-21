import React, { createContext, useContext, useState, useEffect } from 'react';
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
  Message,
  SeoSettings
} from '../types';
import {
  defaultProfile,
  defaultAbout,
  defaultEducation,
  defaultSkills,
  defaultProjects,
  defaultCertificates,
  defaultExperience,
  defaultAchievements,
  defaultBlogs,
  defaultTestimonials,
  defaultSeoSettings
} from '../data/defaultData';

interface AppContextType {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
  
  about: About;
  updateAbout: (about: About) => void;
  
  education: Education[];
  addEducation: (edu: Education) => void;
  updateEducation: (edu: Education) => void;
  deleteEducation: (id: string) => void;
  
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  
  projects: Project[];
  addProject: (proj: Project) => void;
  updateProject: (proj: Project) => void;
  deleteProject: (id: string) => void;
  
  certificates: Certificate[];
  addCertificate: (cert: Certificate) => void;
  updateCertificate: (cert: Certificate) => void;
  deleteCertificate: (id: string) => void;
  
  experience: Experience[];
  addExperience: (exp: Experience) => void;
  updateExperience: (exp: Experience) => void;
  deleteExperience: (id: string) => void;
  
  achievements: Achievement[];
  addAchievement: (ach: Achievement) => void;
  updateAchievement: (ach: Achievement) => void;
  deleteAchievement: (id: string) => void;
  
  blogs: Blog[];
  addBlog: (blog: Blog) => void;
  updateBlog: (blog: Blog) => void;
  deleteBlog: (id: string) => void;
  
  testimonials: Testimonial[];
  addTestimonial: (test: Testimonial) => void;
  updateTestimonial: (test: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'date' | 'read'>) => void;
  deleteMessage: (id: string) => void;
  markMessageRead: (id: string) => void;
  
  seoSettings: SeoSettings;
  updateSeoSettings: (seo: SeoSettings) => void;
  
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getLocalOrDefault = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored) as T;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<Profile>(() => getLocalOrDefault('port_profile', defaultProfile));
  const [about, setAboutState] = useState<About>(() => getLocalOrDefault('port_about', defaultAbout));
  const [education, setEducationState] = useState<Education[]>(() => getLocalOrDefault('port_education', defaultEducation));
  const [skills, setSkillsState] = useState<Skill[]>(() => getLocalOrDefault('port_skills', defaultSkills));
  const [projects, setProjectsState] = useState<Project[]>(() => getLocalOrDefault('port_projects', defaultProjects));
  const [certificates, setCertificatesState] = useState<Certificate[]>(() => getLocalOrDefault('port_certificates', defaultCertificates));
  const [experience, setExperienceState] = useState<Experience[]>(() => getLocalOrDefault('port_experience', defaultExperience));
  const [achievements, setAchievementsState] = useState<Achievement[]>(() => getLocalOrDefault('port_achievements', defaultAchievements));
  const [blogs, setBlogsState] = useState<Blog[]>(() => getLocalOrDefault('port_blogs', defaultBlogs));
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(() => getLocalOrDefault('port_testimonials', defaultTestimonials));
  const [messages, setMessagesState] = useState<Message[]>(() => getLocalOrDefault('port_messages', []));
  const [seoSettings, setSeoSettingsState] = useState<SeoSettings>(() => getLocalOrDefault('port_seo', defaultSeoSettings));
  
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('port_theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('port_admin_logged') === 'true';
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    localStorage.setItem('port_theme', theme);
  }, [theme]);

  // Sync state functions that update local storage
  const updateProfile = (p: Profile) => {
    setProfileState(p);
    localStorage.setItem('port_profile', JSON.stringify(p));
  };

  const updateAbout = (a: About) => {
    setAboutState(a);
    localStorage.setItem('port_about', JSON.stringify(a));
  };

  const addEducation = (edu: Education) => {
    const next = [...education, edu];
    setEducationState(next);
    localStorage.setItem('port_education', JSON.stringify(next));
  };
  const updateEducation = (edu: Education) => {
    const next = education.map(e => e.id === edu.id ? edu : e);
    setEducationState(next);
    localStorage.setItem('port_education', JSON.stringify(next));
  };
  const deleteEducation = (id: string) => {
    const next = education.filter(e => e.id !== id);
    setEducationState(next);
    localStorage.setItem('port_education', JSON.stringify(next));
  };

  const addSkill = (skill: Skill) => {
    const next = [...skills, skill];
    setSkillsState(next);
    localStorage.setItem('port_skills', JSON.stringify(next));
  };
  const updateSkill = (skill: Skill) => {
    const next = skills.map(s => s.id === skill.id ? skill : s);
    setSkillsState(next);
    localStorage.setItem('port_skills', JSON.stringify(next));
  };
  const deleteSkill = (id: string) => {
    const next = skills.filter(s => s.id !== id);
    setSkillsState(next);
    localStorage.setItem('port_skills', JSON.stringify(next));
  };

  const addProject = (proj: Project) => {
    const next = [...projects, proj];
    setProjectsState(next);
    localStorage.setItem('port_projects', JSON.stringify(next));
  };
  const updateProject = (proj: Project) => {
    const next = projects.map(p => p.id === proj.id ? proj : p);
    setProjectsState(next);
    localStorage.setItem('port_projects', JSON.stringify(next));
  };
  const deleteProject = (id: string) => {
    const next = projects.filter(p => p.id !== id);
    setProjectsState(next);
    localStorage.setItem('port_projects', JSON.stringify(next));
  };

  const addCertificate = (cert: Certificate) => {
    const next = [...certificates, cert];
    setCertificatesState(next);
    localStorage.setItem('port_certificates', JSON.stringify(next));
  };
  const updateCertificate = (cert: Certificate) => {
    const next = certificates.map(c => c.id === cert.id ? cert : c);
    setCertificatesState(next);
    localStorage.setItem('port_certificates', JSON.stringify(next));
  };
  const deleteCertificate = (id: string) => {
    const next = certificates.filter(c => c.id !== id);
    setCertificatesState(next);
    localStorage.setItem('port_certificates', JSON.stringify(next));
  };

  const addExperience = (exp: Experience) => {
    const next = [...experience, exp];
    setExperienceState(next);
    localStorage.setItem('port_experience', JSON.stringify(next));
  };
  const updateExperience = (exp: Experience) => {
    const next = experience.map(e => e.id === exp.id ? exp : e);
    setExperienceState(next);
    localStorage.setItem('port_experience', JSON.stringify(next));
  };
  const deleteExperience = (id: string) => {
    const next = experience.filter(e => e.id !== id);
    setExperienceState(next);
    localStorage.setItem('port_experience', JSON.stringify(next));
  };

  const addAchievement = (ach: Achievement) => {
    const next = [...achievements, ach];
    setAchievementsState(next);
    localStorage.setItem('port_achievements', JSON.stringify(next));
  };
  const updateAchievement = (ach: Achievement) => {
    const next = achievements.map(a => a.id === ach.id ? ach : a);
    setAchievementsState(next);
    localStorage.setItem('port_achievements', JSON.stringify(next));
  };
  const deleteAchievement = (id: string) => {
    const next = achievements.filter(a => a.id !== id);
    setAchievementsState(next);
    localStorage.setItem('port_achievements', JSON.stringify(next));
  };

  const addBlog = (blog: Blog) => {
    const next = [...blogs, blog];
    setBlogsState(next);
    localStorage.setItem('port_blogs', JSON.stringify(next));
  };
  const updateBlog = (blog: Blog) => {
    const next = blogs.map(b => b.id === blog.id ? blog : b);
    setBlogsState(next);
    localStorage.setItem('port_blogs', JSON.stringify(next));
  };
  const deleteBlog = (id: string) => {
    const next = blogs.filter(b => b.id !== id);
    setBlogsState(next);
    localStorage.setItem('port_blogs', JSON.stringify(next));
  };

  const addTestimonial = (test: Testimonial) => {
    const next = [...testimonials, test];
    setTestimonialsState(next);
    localStorage.setItem('port_testimonials', JSON.stringify(next));
  };
  const updateTestimonial = (test: Testimonial) => {
    const next = testimonials.map(t => t.id === test.id ? test : t);
    setTestimonialsState(next);
    localStorage.setItem('port_testimonials', JSON.stringify(next));
  };
  const deleteTestimonial = (id: string) => {
    const next = testimonials.filter(t => t.id !== id);
    setTestimonialsState(next);
    localStorage.setItem('port_testimonials', JSON.stringify(next));
  };

  const addMessage = (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newMsg: Message = {
      ...msg,
      id: "msg_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      date: new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };
    const next = [newMsg, ...messages];
    setMessagesState(next);
    localStorage.setItem('port_messages', JSON.stringify(next));
  };
  const deleteMessage = (id: string) => {
    const next = messages.filter(m => m.id !== id);
    setMessagesState(next);
    localStorage.setItem('port_messages', JSON.stringify(next));
  };
  const markMessageRead = (id: string) => {
    const next = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessagesState(next);
    localStorage.setItem('port_messages', JSON.stringify(next));
  };

  const updateSeoSettings = (seo: SeoSettings) => {
    setSeoSettingsState(seo);
    localStorage.setItem('port_seo', JSON.stringify(seo));
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = (username: string, pword: string): boolean => {
    if (username === 'admin' && pword === 'Admin@123') {
      setIsAuthenticated(true);
      localStorage.setItem('port_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('port_admin_logged', 'false');
  };

  return (
    <AppContext.Provider value={{
      profile, updateProfile,
      about, updateAbout,
      education, addEducation, updateEducation, deleteEducation,
      skills, addSkill, updateSkill, deleteSkill,
      projects, addProject, updateProject, deleteProject,
      certificates, addCertificate, updateCertificate, deleteCertificate,
      experience, addExperience, updateExperience, deleteExperience,
      achievements, addAchievement, updateAchievement, deleteAchievement,
      blogs, addBlog, updateBlog, deleteBlog,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      messages, addMessage, deleteMessage, markMessageRead,
      seoSettings, updateSeoSettings,
      theme, toggleTheme,
      isAuthenticated, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
