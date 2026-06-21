import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, FolderGit2, Calendar, GitFork, ExternalLink, Video, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Projects: React.FC = () => {
  const { projects } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  // Carousel State inside selected modal
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const categories = ['All', 'React', 'Python', 'Flutter', 'Civil', 'MBA'];

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.technologiesUsed.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenProject = (proj: typeof projects[0]) => {
    setSelectedProject(proj);
    setActiveImgIdx(0);
  };

  const nextSlide = (images: string[]) => {
    setActiveImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (images: string[]) => {
    setActiveImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white">
          Portfolio Projects
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Explore Arjun's hybrid engineering tools and business calculators. Search, filter by sector, and inspect design outcomes.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 max-w-4xl mx-auto bg-white/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/40 backdrop-blur-sm">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects or stack tech..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-[10.5px] font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow shadow-amber-500/10'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <motion.div
            key={proj.id}
            layout
            onClick={() => handleOpenProject(proj)}
            className="group rounded-2xl glass-panel overflow-hidden border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer"
          >
            <div>
              {/* Product Thumbnail */}
              <div className="h-44 relative bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <img
                  src={proj.screenshots[0] || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"}
                  alt={proj.projectTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                
                <span className="absolute top-4 left-4 inline-block px-2.5 py-0.5 text-[9px] font-bold tracking-wider bg-slate-950/85 text-white uppercase rounded-full">
                  {proj.category}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
                  {proj.projectTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-[10px]">
              <div className="flex flex-wrap gap-1 max-w-[70%]">
                {proj.technologiesUsed.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="text-amber-500 font-bold hover:text-amber-600 uppercase flex items-center space-x-1">
                <span>Details</span>
                <ChevronRight size={11} />
              </span>
            </div>
          </motion.div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-16 text-center glass-panel rounded-2xl">
            <FolderGit2 size={36} className="text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">No workspace projects found currently.</p>
          </div>
        )}
      </div>

      {/* Project details slider modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl z-10 overflow-hidden max-h-[92vh] flex flex-col justify-between"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                id="close-project-modal"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto space-y-5 pr-1 py-1">
                <div className="space-y-1.5 pr-8">
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold tracking-wider uppercase rounded-full">
                    {selectedProject.category} Project
                  </div>
                  <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                    {selectedProject.projectTitle}
                  </h2>
                </div>

                {/* Screenshots carousel */}
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <div className="relative w-full h-80 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center group">
                    <img
                      src={selectedProject.screenshots[activeImgIdx]}
                      alt={`${selectedProject.projectTitle} active screenshot`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {selectedProject.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={() => prevSlide(selectedProject.screenshots)}
                          className="absolute left-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors pointer-events-auto"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => nextSlide(selectedProject.screenshots)}
                          className="absolute right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors pointer-events-auto"
                        >
                          <ChevronRight size={16} />
                        </button>

                        {/* Slide dots marker */}
                        <div className="absolute bottom-3 flex space-x-1.5">
                          {selectedProject.screenshots.map((_, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => setActiveImgIdx(sIdx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                activeImgIdx === sIdx ? 'bg-amber-500 w-3' : 'bg-white/70'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Project Specs Matrix (Objective, Methodology, Outcome) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10 space-y-1">
                    <h4 className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-wider">
                      1. Project Objective:
                    </h4>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {selectedProject.objective}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 space-y-1">
                    <h4 className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider">
                      2. Execution Methodology:
                    </h4>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {selectedProject.methodology}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 space-y-1">
                    <h4 className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider">
                      3. Concrete Outcome:
                    </h4>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {selectedProject.outcome}
                    </p>
                  </div>
                </div>

                {/* Video / Video Link Block */}
                {selectedProject.videoLink && (
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-450">
                        <Video size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                          Play Demo Showcase:
                        </h4>
                        <p className="text-[10.5px] text-slate-400">
                          Inspect simulated mechanics and custom screen walk-throughs on YouTube/Drive.
                        </p>
                      </div>
                    </div>
                    <a
                      href={selectedProject.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-rose-650 hover:bg-rose-700 text-white font-semibold text-xs tracking-wider flex items-center space-x-1"
                    >
                      <span>Play Walkthrough</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                )}

                {/* Technologies used */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Technologies Installed & Utilized:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologiesUsed.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer link trigger buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex space-x-2">
                  {selectedProject.gitHubLink && (
                    <a
                      href={selectedProject.gitHubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 text-xs font-semibold"
                    >
                      <GitFork size={13} />
                      <span>Repo Copy</span>
                    </a>
                  )}
                  {selectedProject.liveDemoLink && (
                    <a
                      href={selectedProject.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold"
                    >
                      <ExternalLink size={13} />
                      <span>Live Client</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  Close Product Inspect
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
