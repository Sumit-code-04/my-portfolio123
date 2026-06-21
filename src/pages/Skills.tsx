import React from 'react';
import { useApp } from '../context/AppContext';
import { Code2, Users, HeartHandshake, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Skills: React.FC = () => {
  const { skills } = useApp();

  const technical = skills.filter(s => s.category === 'Technical Skills');
  const management = skills.filter(s => s.category === 'Management Skills');
  const soft = skills.filter(s => s.category === 'Soft Skills');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const renderCategoryCard = (
    title: string,
    list: typeof skills,
    icon: React.ReactNode,
    colorClass: string,
    accentBg: string
  ) => {
    return (
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center space-x-2">
              <span className={`p-2 rounded-xl ${accentBg} ${colorClass}`}>
                {icon}
              </span>
              <span>{title}</span>
            </h2>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full font-medium text-slate-500">
              {list.length} Items
            </span>
          </div>

          <div className="space-y-4">
            {list.map((skill) => (
              <div key={skill.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-350">{skill.skillName}</span>
                  <span className={`${colorClass} font-semibold`}>{skill.percentage}%</span>
                </div>
                {/* Custom Progress Track */}
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      title.includes('Technical')
                        ? 'from-blue-500 to-indigo-500'
                        : title.includes('Management')
                        ? 'from-amber-400 to-amber-600'
                        : 'from-emerald-400 to-emerald-600'
                    }`}
                  />
                </div>
              </div>
            ))}

            {list.length === 0 && (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic py-4 text-center">
                No competency entries registered in this category.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-[10.5px] text-slate-400 flex items-center space-x-1">
          <Sparkles size={11} className={colorClass} />
          <span>Calibrated for core recruiter audit</span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white">
          Strategic Competencies & Skills
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Explore the exact skills map across technological foundations, personnel administration, and behavioral/soft capabilities.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {renderCategoryCard(
          "Technical Skills",
          technical,
          <Code2 size={16} />,
          "text-blue-500",
          "bg-blue-500/10"
        )}

        {renderCategoryCard(
          "Management Skills",
          management,
          <Users size={16} />,
          "text-amber-500",
          "bg-amber-500/10"
        )}

        {renderCategoryCard(
          "Soft Skills",
          soft,
          <HeartHandshake size={16} />,
          "text-emerald-500",
          "bg-emerald-500/10"
        )}
      </motion.div>
    </div>
  );
};
