import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Award, BookOpen, Eye, Globe, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { about, education } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="text-center mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white">
          About & Academic Foundation
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Delve into the strategic goals, core strengths, and structural civil & executive business schooling records that define Arjun's career alignment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: About, Objective, Core Lists */}
        <div className="lg:col-span-7 space-y-6">
          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl glass-panel shadow-sm border border-slate-200/50 dark:border-slate-800/50"
          >
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-500 mb-3 flex items-center space-x-2">
              <Sparkles size={14} />
              <span>Professional Introduction</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              {about.introduction}
            </p>
          </motion.div>

          {/* Objective Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20"
          >
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center space-x-2">
              <Eye size={14} />
              <span>Career Objective</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{about.careerObjective}"
            </p>
          </motion.div>

          {/* Quick Pillars (Strengths, Languages, Interests) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-5 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/50">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center space-x-1.5">
                <Award size={13} className="text-emerald-500" />
                <span>Superpower Strengths</span>
              </h3>
              <ul className="space-y-2">
                {about.strengths.map((str, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-350 flex items-start space-x-1.5">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages & Interests */}
            <div className="space-y-4">
              {/* Languages */}
              <div className="p-4 rounded-xl glass-card border border-slate-200/50 dark:border-slate-800/50">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center space-x-1.5">
                  <Globe size={13} className="text-indigo-500" />
                  <span>Languages spoken</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {about.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="p-4 rounded-xl glass-card border border-slate-200/50 dark:border-slate-800/50">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center space-x-1.5">
                  <BookOpen size={13} className="text-pink-500" />
                  <span>Strategic Interests</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {about.interests.map((int, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-300"
                    >
                      {int}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Education Timeline */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl glass-panel shadow-sm border border-slate-200/50 dark:border-slate-800/50 h-full">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
              <GraduationCap size={18} className="text-amber-500" />
              <span>Academic Timeline</span>
            </h2>

            {/* Timeline Tree */}
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-5 ml-2.5 space-y-6">
              {education.map((edu, idx) => (
                <div key={edu.id} className="relative">
                  {/* Timeline Badge Point */}
                  <span className="absolute -left-[30px] top-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white font-bold ring-4 ring-white dark:ring-slate-900 border border-amber-500 scale-90">
                    <GraduationCap size={10} />
                  </span>

                  {/* Institution Details */}
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-amber-500 bg-amber-500/10 rounded-full">
                      {edu.year}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {edu.college} • <span className="italic">{edu.university}</span>
                    </div>
                    {edu.cgpa && (
                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Performance: GPA {edu.cgpa}
                      </div>
                    )}
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
