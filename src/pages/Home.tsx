import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Download, Linkedin, Send, Award, Briefcase, Code, Sparkles, MoveRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export const Home: React.FC = () => {
  const { profile, projects, skills, certificates, experience } = useApp();
  
  // Custom Typing Effect
  const roles = [
    "MBA Student",
    "B.Tech Civil Engineering Graduate",
    "HR Enthusiast",
    "Management Professional"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(70);

        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  // Animated counters trigger
  const [counts, setCounts] = useState({ projects: 0, skills: 0, certs: 0, exp: 0 });

  useEffect(() => {
    const targetProjects = projects.length;
    const targetSkills = skills.length;
    const targetCerts = certificates.length;
    const targetExp = experience.length;

    const duration = 1000; // 1 second animate
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounts({
        projects: Math.round((targetProjects / steps) * currentStep),
        skills: Math.round((targetSkills / steps) * currentStep),
        certs: Math.round((targetCerts / steps) * currentStep),
        exp: Math.round((targetExp / steps) * currentStep),
      });

      if (currentStep >= steps) {
        setCounts({
          projects: targetProjects,
          skills: targetSkills,
          certs: targetCerts,
          exp: targetExp,
        });
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [projects, skills, certificates, experience]);

  const triggerResumeDownload = () => {
    // If the base64 is standard default or placeholder, offer a structured download option
    try {
      const link = document.createElement('a');
      link.href = profile.resumePdf || 'data:text/plain;base64,U2FtcGxlIFJlc3VtZQ==';
      link.download = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Resume downloaded successfully!');
    } catch {
      toast.error('Resume source is unavailable as binary database is clearing.');
    }
  };

  return (
    <div className="relative min-h-[90vh]">
      {/* Premium ambient decorative rings */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-5 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Bio Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles size={14} className="animate-pulse" />
              <span>Open to Corporate Roles & Recruiter Analysis</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-slate-900 dark:text-white">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500">{profile.name}</span>
              </h1>
              
              {/* Animated Typing Role */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="font-display font-semibold text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300">
                  {currentText}
                  <span className="inline-block w-1 h-6 bg-amber-500 ml-1 animate-pulse" />
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {profile.shortBio}
            </p>

            {/* Action buttons list */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={triggerResumeDownload}
                className="flex items-center space-x-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 text-white font-semibold text-xs rounded-xl tracking-wider uppercase transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                id="hero-download-resume"
              >
                <Download size={14} />
                <span>Download Resume</span>
              </button>

              <Link
                to="/contact"
                className="flex items-center space-x-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-400 font-semibold text-xs rounded-xl tracking-wider uppercase transition-all shadow-md shadow-slate-150 cursor-pointer"
                id="hero-hire-me"
              >
                <Send size={14} />
                <span>Hire Me</span>
              </Link>

              {profile.linkedIn && (
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider transition-all"
                  id="hero-linkedin-link"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* Hero Profile Right */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-2xl blur-xl opacity-20 dark:opacity-30 animate-pulse scale-102" />
              
              {/* Image Container with Custom Slanted Accent */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 overflow-hidden rounded-2xl border-2 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900 group">
                <img
                  src={profile.profileImage || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Float Accent Card */}
              <div className="absolute -bottom-4 -left-4 glass-panel border border-slate-200/50 dark:border-slate-800/50 p-3 rounded-lg flex items-center space-x-2 shadow-lg">
                <div className="bg-emerald-500/10 text-emerald-600 p-1.5 rounded">
                  <Star size={14} className="fill-emerald-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                    Interview Fit
                  </div>
                  <div className="text-[9px] text-slate-400">
                    High analytical bias
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Stats Section */}
        <div className="mt-20 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Stat Item Proj */}
            <div className="p-4 rounded-xl glass-card text-center neon-border-hover">
              <div className="inline-flex p-2 rounded-lg bg-indigo-500/10 text-indigo-500 mb-2">
                <Code size={16} />
              </div>
              <div className="font-display font-bold text-2xl lg:text-3xl text-slate-800 dark:text-white">
                {counts.projects}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Core Projects
              </div>
            </div>

            {/* Stat Item Skill */}
            <div className="p-4 rounded-xl glass-card text-center neon-border-hover">
              <div className="inline-flex p-2 rounded-lg bg-amber-500/10 text-amber-500 mb-2">
                <Sparkles size={16} />
              </div>
              <div className="font-display font-bold text-2xl lg:text-3xl text-slate-800 dark:text-white">
                {counts.skills}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Strategic Competencies
              </div>
            </div>

            {/* Stat Item Cert */}
            <div className="p-4 rounded-xl glass-card text-center neon-border-hover">
              <div className="inline-flex p-2 rounded-lg bg-pink-500/10 text-pink-500 mb-2">
                <Award size={16} />
              </div>
              <div className="font-display font-bold text-2xl lg:text-3xl text-slate-800 dark:text-white">
                {counts.certs}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Certificates
              </div>
            </div>

            {/* Stat Item Exp */}
            <div className="p-4 rounded-xl glass-card text-center neon-border-hover">
              <div className="inline-flex p-2 rounded-lg bg-emerald-500/10 text-emerald-500 mb-2">
                <Briefcase size={16} />
              </div>
              <div className="font-display font-bold text-2xl lg:text-3xl text-slate-800 dark:text-white">
                {counts.exp}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Professional Tenures
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-500/10 border border-amber-500/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-display font-bold text-sm tracking-tight text-slate-800 dark:text-white">
              Interested in Arjun's hybrid civil & management profile?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              Explore custom engineering calculators, view documented leadership case studies, or message Arjun directly using the local Contact client.
            </p>
          </div>
          <Link
            to="/projects"
            className="group flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Explore Projects</span>
            <MoveRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
