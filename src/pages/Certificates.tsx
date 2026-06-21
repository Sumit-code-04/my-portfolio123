import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Calendar, ExternalLink, Download, FileText, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

export const Certificates: React.FC = () => {
  const { certificates } = useApp();
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const handleDownload = (cert: typeof certificates[0]) => {
    try {
      const link = document.createElement('a');
      link.href = cert.pdf || cert.certificateImage || 'data:text/plain;base64,Q2VydGlmaWNhdGU=';
      link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Certificate download triggered!');
    } catch {
      toast.error('Download source is unavailable.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white">
          Verified Certifications
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Honors, accreditations, and industrial credentials earned from top-tier professional organizations. Click on any certificate to inspect its details or download verified parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-2xl glass-panel overflow-hidden border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              {/* Image Banner */}
              <div className="h-44 relative bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <img
                  src={cert.certificateImage || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80"}
                  alt={cert.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                
                {/* Actions overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-3 transition-opacity">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="p-2 rounded-full bg-white text-slate-800 hover:bg-slate-100 transition-colors shadow"
                    title="Preview Certificate"
                    id={`preview-cert-${cert.id}`}
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => handleDownload(cert)}
                    className="p-2 rounded-full bg-white text-slate-800 hover:bg-slate-100 transition-colors shadow"
                    title="Download File"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>

              {/* Copy area */}
              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  <Award size={12} className="text-amber-500" />
                  <span>{cert.organization}</span>
                </div>
                
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center space-x-1 font-medium">
                <Calendar size={11} className="text-indigo-500" />
                <span>Granted: {cert.date}</span>
              </span>
              <button
                onClick={() => setSelectedCert(cert)}
                className="text-amber-500 hover:text-amber-600 font-semibold cursor-pointer flex items-center space-x-0.5"
              >
                <span>Inspect</span>
                <ExternalLink size={10} />
              </button>
            </div>
          </motion.div>
        ))}

        {certificates.length === 0 && (
          <div className="col-span-full py-16 text-center glass-panel rounded-2xl">
            <Award size={36} className="text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">No certificates recorded in state currently.</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950"
              onClick={() => setSelectedCert(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Close pin */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                id="close-cert-modal"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto space-y-4 pr-1">
                <div className="space-y-1.5 pr-8">
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold tracking-wider uppercase rounded-full">
                    {selectedCert.organization}
                  </div>
                  <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                    {selectedCert.title}
                  </h2>
                  <div className="text-xs text-slate-400 flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>Issued in {selectedCert.date}</span>
                  </div>
                </div>

                {/* Main Large Image Inspect */}
                <div className="w-full h-80 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50 dark:border-slate-800">
                  <img
                    src={selectedCert.certificateImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80'}
                    alt={selectedCert.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-350 uppercase tracking-widest">
                    Certification Description & Criteria:
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    {selectedCert.description}
                  </p>
                </div>
              </div>

              {/* Actions tail */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-200 dark:border-slate-800"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => handleDownload(selectedCert)}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl tracking-wider uppercase transition-colors"
                >
                  <Download size={13} />
                  <span>Download Credentials</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
