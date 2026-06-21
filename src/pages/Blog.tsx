import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Calendar, Search, Tag, X, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Blog: React.FC = () => {
  const { blogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null);

  const filteredBlogs = blogs.filter(b => {
    const term = searchTerm.toLowerCase();
    return (
      b.title.toLowerCase().includes(term) ||
      b.category.toLowerCase().includes(term) ||
      b.description.toLowerCase().includes(term) ||
      b.tags.some(t => t.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white">
          Avenue of Insights (Blog)
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Thought leadership articles bridging analytical infrastructure methodologies and contemporary strategic HR metrics.
        </p>
      </div>

      {/* Search Input block */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blogs, categories, tags..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBlogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              {/* Cover Banner */}
              <div className="h-56 relative bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <img
                  src={blog.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                <span className="absolute top-4 left-4 inline-block px-2.5 py-0.5 text-[9px] font-bold tracking-wider bg-slate-900/80 text-white uppercase rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* Text copy */}
              <div className="p-6 space-y-3">
                <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 line-clamp-2 leading-tight group-hover:text-amber-500 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
              </div>
            </div>

            {/* Bottom Meta panel */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
              {/* Tags inline */}
              <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                {blog.tags.slice(0, 2).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-medium flex items-center space-x-0.5"
                  >
                    <Tag size={8} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedBlog(blog)}
                className="text-xs text-amber-500 hover:text-amber-600 font-semibold flex items-center space-x-0.5 cursor-pointer"
                id={`read-blog-${blog.id}`}
              >
                <span>Read Article</span>
              </button>
            </div>
          </motion.div>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="col-span-full py-16 text-center glass-panel rounded-2xl">
            <BookOpen size={36} className="text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">No articles matching search query found.</p>
          </div>
        )}
      </div>

      {/* Read Detail Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950"
              onClick={() => setSelectedBlog(null)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Close Button overlay */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                id="close-blog-modal"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto space-y-4 pr-1">
                <div className="space-y-1.5 pr-8">
                  <div className="inline-flex items-center space-x-1.5">
                    <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-500 text-[10px] font-bold tracking-wider uppercase rounded-full">
                      {selectedBlog.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center space-x-0.5">
                      <Clock size={10} />
                      <span>5 min read</span>
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                    {selectedBlog.title}
                  </h2>
                </div>

                {/* Banner */}
                <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50 dark:border-slate-800">
                  <img
                    src={selectedBlog.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'}
                    alt={selectedBlog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  {/* Mock Detailed Body derived elegantly from description */}
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-350 italic">
                      Summary: {selectedBlog.description}
                    </p>
                    <p>
                      In modern engineering and management spheres, practitioners increasingly observe that analytical competency forms only half of the solution criteria. The modern business ecosystem demands a rigorous synthesis of technical optimization and human resources scalability—a trait natively generated which Arjun embodies.
                    </p>
                    <p>
                      Leveraging structural integrity, resource leveling, and Gantt charts from civil operations provides an excellent framework. When applied directly to organizational pipelines, recruiting analytics, and talent leveling, this dual structural perspective ensures that scaling teams operate with zero friction.
                    </p>
                  </div>

                  {/* Tags line */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    {selectedBlog.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-500 dark:text-slate-400 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close footer area */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedBlog(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  Close Article View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
