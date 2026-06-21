import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquarePlus, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export const Contact: React.FC = () => {
  const { addMessage, profile } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom Validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error('All form fields are strictly required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please input a valid corporate email format.');
      return;
    }

    setSubmitting(true);

    // Realistic network proxy delay 
    setTimeout(() => {
      addMessage({
        name,
        email,
        subject,
        message,
      });

      setSubmitting(false);
      toast.success('Message registered successfully in local recruiter logs!');
      
      // Clear inputs
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 600);
  };

  const handleSendDirectEmail = () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error('Please fill in Name, Corporate Email, Subject and Message body first to draft your email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please input a valid corporate email format first.');
      return;
    }

    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(`[Portfolio Contact] ${subject}`)}&body=${encodeURIComponent(
      `Hello Arjun,\n\n${message}\n\n---\nSender Details:\nName: ${name}\nCorporate Email: ${email}`
    )}`;
    
    window.location.href = mailtoUrl;
    toast.success('Triggering mail client with drafted contents!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="text-center mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white">
          Secure Recruiter Contact Hub
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
          Send a strategic query or request interview slots. Your message will persist inside browser localStorage under the Admin Dashboard’s visual inbox.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-5xl mx-auto">
        {/* Left Side: Contact Cards */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-6 flex-1 flex flex-col justify-center"
          >
            <div className="space-y-1.5 mb-2">
              <h2 className="font-display font-bold text-base text-slate-800 dark:text-white flex items-center space-x-2">
                <Sparkles size={16} className="text-amber-500 animate-pulse" />
                <span>Contact Coordinates</span>
              </h2>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Connect directly with Arjun through conventional paths or leave a digital notice.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Card */}
              <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/45 border border-slate-100 dark:border-slate-800 hover:border-amber-500/20 transition-all cursor-pointer">
                <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-455">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Corporate Email:
                  </h4>
                  <a href={`mailto:${profile.email}`} className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              {profile.phone && (
                <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/45 border border-slate-100 dark:border-slate-800 hover:border-amber-500/20 transition-all cursor-pointer">
                  <div className="p-2.5 rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-455">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Primary Contact:
                    </h4>
                    <a href={`tel:${profile.phone}`} className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Address Card */}
              {profile.address && (
                <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/45 border border-slate-100 dark:border-slate-800 hover:border-amber-500/20 transition-all cursor-pointer">
                  <div className="p-2.5 rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-455">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Geographic Base:
                    </h4>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {profile.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Message form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 shadow-md h-full flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                  <MessageSquarePlus size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                    Dispatch encrypted local notice
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Your transmission stores locally, alerting the admin menu instantly.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Samit Rathod"
                      className="w-full px-3.5 py-1.8 text-xs rounded-xl bg-slate-100/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Samitrathod123@gmail.com"
                      className="w-full px-3.5 py-1.8 text-xs rounded-xl bg-slate-100/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Interview schedule / Professional Opportunity"
                    className="w-full px-3.5 py-1.8 text-xs rounded-xl bg-slate-100/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>

                {/* Message body block */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                    Detailed Message Body
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Radhika, we reviewed your civil graduation metrics alongside MBA objectives and would love to process an informational interview request..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    required
                  />
                </div>

                {/* submit and direct email Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full cursor-pointer py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center space-x-2 hover:shadow-lg shadow-amber-500/10"
                  >
                    {submitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Dispatch Encrypted Note</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendDirectEmail}
                    className="w-full cursor-pointer py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <Mail size={12} className="text-amber-500" />
                    <span>Send via Direct Email (Mail Client)</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
