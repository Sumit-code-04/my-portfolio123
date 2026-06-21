import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Lock, User, Eye, EyeOff, ShieldCheck, Key } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCreds, setShowCreds] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error('Please enter both username and password');
      return;
    }

    setLoading(true);

    // Add a tiny realistic delay for feeling of authentication check
    setTimeout(() => {
      const success = login(username, password);
      setLoading(false);
      if (success) {
        toast.success('Welcome back, Administrator!');
        navigate('/admin');
      } else {
        toast.error('Invalid administrative credentials. Hint: check username and password.');
      }
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/10 text-amber-500 rounded-2xl mb-3 border border-amber-500/20">
            <ShieldCheck size={28} />
          </div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-slate-800 dark:text-slate-100">
            Secure Admin Doorway
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access credentials to manage the recruiter-focused portfolio
          </p>
        </div>

        <div className="glass-panel border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 font-mono transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 text-xs rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 font-mono transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Helper Hint */}
            <div className="p-3 rounded-lg bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/10 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[10.5px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-sans">
                  <Key size={12} className="text-amber-500 animate-pulse" />
                  <span>Sandbox Credentials</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUsername('admin');
                      setPassword('Admin@123');
                      toast.success('Credentials filled! Please click "Unlock Dashboard" to continue.');
                    }}
                    className="text-[10px] bg-amber-500/10 hover:bg-amber-500/20 dark:bg-amber-400/10 dark:hover:bg-amber-400/20 text-amber-600 dark:text-amber-400 font-semibold px-2 py-0.5 rounded transition-all cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreds(!showCreds)}
                    className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline cursor-pointer"
                  >
                    {showCreds ? 'Hide' : 'Reveal'}
                  </button>
                </div>
              </div>

              {showCreds && (
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-amber-500/10 font-mono text-[10px] select-all">
                  <span>Username: <strong className="text-slate-700 dark:text-white">admin</strong></span>
                  <span>Password: <strong className="text-slate-700 dark:text-white">Admin@123</strong></span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-md shadow-amber-500/10"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Unlock Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
