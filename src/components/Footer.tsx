import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Linkedin, Github, Mail, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = useApp();

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand/Signature */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="text-xl font-display font-bold text-slate-800 dark:text-slate-100">
              {profile.name}
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {profile.shortBio}
            </p>
            <div className="flex space-x-3 pt-2">
              {profile.linkedIn && (
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {profile.gitHub && (
                <a
                  href={profile.gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Contact Info
            </h3>
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <Mail size={13} className="text-emerald-500" />
              <a href={`mailto:${profile.email}`} className="hover:text-amber-500 transition-colors">
                {profile.email}
              </a>
            </div>
            {profile.phone && (
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <Phone size={13} className="text-cyan-500" />
                <a href={`tel:${profile.phone}`} className="hover:text-amber-500 transition-colors">
                  {profile.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved under recruiter guidelines.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Built with precision for recruiter analysis</span>
            <Heart size={10} className="text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
