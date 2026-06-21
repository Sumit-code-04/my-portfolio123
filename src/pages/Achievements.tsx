import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Achievements: React.FC = () => {
  const { achievements } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white">
          Outstanding Milestones & Laurels
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          A chronicled compilation of scholarly laurels, business case championships, and core architectural innovations verified in the field.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-amber-500/30 dark:border-amber-500/20 py-4 space-y-8">
        {achievements.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            {/* Crown Point */}
            <span className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex items-center justify-center w-7 h-7 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20 ring-4 ring-slate-50 dark:ring-slate-950 border border-amber-400">
              <Trophy size={11} className="fill-amber-100" />
            </span>

            {/* Content Body */}
            <div className="p-5 sm:p-6 rounded-2xl glass-panel hover:shadow-md transition-all border border-slate-200/50 dark:border-slate-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider bg-amber-500/10 text-amber-500 uppercase">
                  <Calendar size={10} className="mr-0.5" />
                  <span>Year: {ach.year}</span>
                </span>
                
                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center space-x-0.5">
                  <Sparkles size={11} className="text-amber-500" />
                  <span>laurel</span>
                </span>
              </div>

              <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                {ach.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {ach.description}
              </p>
            </div>
          </motion.div>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-16">
            <Trophy size={36} className="text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">No landmarks documented in state currently.</p>
          </div>
        )}
      </div>
    </div>
  );
};
