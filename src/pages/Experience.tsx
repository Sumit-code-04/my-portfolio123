import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Calendar, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const Experience: React.FC = () => {
  const { experience } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white">
          Professional Work History
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Arjun's industry tenures spanning infrastructure coordination, project management templates, supply negotiations, and organizational leadership support.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-indigo-500/30 dark:border-indigo-500/20 py-4 space-y-8">
        {experience.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            {/* Briefcase timeline mark */}
            <span className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-500 text-white shadow-md shadow-indigo-500/20 ring-4 ring-slate-50 dark:ring-slate-950 border border-indigo-400">
              <Briefcase size={11} />
            </span>

            {/* Main tenure card */}
            <div className="p-5 sm:p-6 rounded-2xl glass-panel hover:shadow-md transition-all border border-slate-200/50 dark:border-slate-800/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider bg-indigo-500/10 text-indigo-500 uppercase">
                  <Clock size={10} className="mr-0.5" />
                  <span>{exp.duration}</span>
                </span>
                
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  Full-Time Tenant
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                  {exp.role}
                </h3>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {exp.company}
                </div>
              </div>

              {/* Responsibilities lists */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Responsibilities & Impact metrics:
                </h4>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-2">
                      <CheckCircle size={12} className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-16">
            <Briefcase size={36} className="text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">No experience tenures recorded in state currently.</p>
          </div>
        )}
      </div>
    </div>
  );
};
