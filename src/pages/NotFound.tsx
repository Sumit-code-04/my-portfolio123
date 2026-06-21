import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 max-w-md"
      >
        <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <ShieldAlert size={40} />
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white">
            404 - Not Located
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The requested folder or pipeline does not exist in Arjun's current portfolio map. Please double-check the URL or return to safety.
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-amber-500 dark:text-slate-950 text-white cursor-pointer hover:bg-slate-800"
          >
            <ArrowLeft size={13} />
            <span>Go back Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
