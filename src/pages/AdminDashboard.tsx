import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Briefcase,
  Award,
  FolderGit2,
  Mail,
  Search,
  Plus,
  Trash2,
  Edit,
  Save,
  LogOut,
  Sliders,
  Maximize2,
  Check,
  ChevronRight,
  Eye,
  Settings,
  GraduationCap,
  Calendar,
  Layers,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { ConfirmDialog } from '../components/ConfirmDialog';

type AdminTab = 'overview' | 'profile' | 'skills' | 'projects' | 'certificates' | 'experience' | 'blogs' | 'messages' | 'seo';

export const AdminDashboard: React.FC = () => {
  const {
    isAuthenticated,
    logout,
    profile, updateProfile,
    about, updateAbout,
    education, addEducation, updateEducation, deleteEducation,
    skills, addSkill, updateSkill, deleteSkill,
    projects, addProject, updateProject, deleteProject,
    certificates, addCertificate, updateCertificate, deleteCertificate,
    experience, addExperience, updateExperience, deleteExperience,
    achievements, addAchievement, updateAchievement, deleteAchievement,
    blogs, addBlog, updateBlog, deleteBlog,
    messages, deleteMessage, markMessageRead,
    seoSettings, updateSeoSettings
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  
  // Dialog controls
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const triggerLogout = () => {
    logout();
    toast.success('Successfully logged out.');
    navigate('/');
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(prev => ({ ...prev, isOpen: false }));
  };

  const promptDelete = (title: string, message: string, onConfirm: () => void) => {
    setDeleteDialog({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        closeDeleteDialog();
      }
    });
  };

  // Helper: File To Base 64 converting
  const readAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // ==========================================
  // VIEW RENDERERS FOR EACH TABS
  // ==========================================

  // 1. OVERVIEW
  const renderOverview = () => {
    const cards = [
      { name: 'Total Projects', count: projects.length, icon: <FolderGit2 size={20} />, bg: 'bg-indigo-500/10 text-indigo-500' },
      { name: 'Total Skills', count: skills.length, icon: <Sparkles size={20} />, bg: 'bg-amber-500/10 text-amber-500' },
      { name: 'Certificates', count: certificates.length, icon: <Award size={20} />, bg: 'bg-pink-500/10 text-pink-500' },
      { name: 'Blogs & Articles', count: blogs.length, icon: <BookOpen size={20} />, bg: 'bg-blue-500/10 text-blue-500' },
      { name: 'Education timeline', count: education.length, icon: <GraduationCap size={20} />, bg: 'bg-teal-500/10 text-teal-400' },
      { name: 'Contact Messages', count: messages.length, icon: <Mail size={20} />, bg: 'bg-emerald-500/10 text-emerald-500' },
    ];

    const unreadCount = messages.filter(m => !m.read).length;

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">System Overview & KPI Indicators</h2>
          <p className="text-xs text-slate-400">Instant metrics summarizing Arjun's recruiter-focused portfolio entries.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, idx) => (
            <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex items-center space-x-4 shadow-sm hover:scale-101 transition-all">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                {card.icon}
              </div>
              <div>
                <dt className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 leading-none mb-1">
                  {card.name}
                </dt>
                <dd className="text-2xl font-display font-extrabold text-slate-800 dark:text-white leading-none">
                  {card.count}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Message Notice panel */}
        {unreadCount > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="p-2 bg-amber-500 text-white rounded-lg animate-bounce">
                <Mail size={16} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  You have {unreadCount} unread message(s)!
                </h4>
                <p className="text-[10px] text-slate-400">
                  Click below to transition to the message inbox tab and audit recruiter bids.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('messages')}
              className="px-3.5 py-1.5 bg-amber-505 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10.5px] rounded-lg tracking-wider uppercase transition-colors"
            >
              Audit Messages
            </button>
          </div>
        )}

        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-sm tracking-tight">Active Recruiter Mock Sandbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              This panel operates entirely in your browser localStorage. Feel free to create new projects, add cert files, delete default items, or reset the layout. Any recruiter visiting your live draft experiences changes instantly!
            </p>
          </div>
          <FolderGit2 className="text-slate-700 hidden sm:block" size={44} />
        </div>
      </div>
    );
  };

  // 2. PROFILE & ABOUT
  const [profileForm, setProfileForm] = useState(profile);
  const [aboutForm, setAboutForm] = useState(about);

  const saveProfileAndAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    updateAbout(aboutForm);
    toast.success('Successfully updated profile and career objectives!');
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await readAsBase64(file);
        setProfileForm(prev => ({ ...prev, profileImage: base64 }));
        toast.success('Profile avatar loaded as localized Base64.');
      } catch {
        toast.error('Failed to read image byte parameters.');
      }
    }
  };

  const renderProfile = () => {
    return (
      <form onSubmit={saveProfileAndAbout} className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Manage Primary Profile & About Sector</h2>
          <p className="text-xs text-slate-400">Directly CRUD coordinates, profile photos, resume attachments, and career summaries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left panel: Profile Details */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">Profile Coordinates</h3>

            <div className="flex items-center space-x-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                <img src={profileForm.profileImage} alt="Avatar draft" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <label className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Upload Profile photo (Base64)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="block w-full text-[11px] text-slate-500 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20 file:cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Display Title</label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={e => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Geographic Address</label>
              <input
                type="text"
                value={profileForm.address}
                onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">LinkedIn link</label>
                <input
                  type="url"
                  value={profileForm.linkedIn}
                  onChange={e => setProfileForm({ ...profileForm, linkedIn: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">GitHub link</label>
                <input
                  type="url"
                  value={profileForm.gitHub}
                  onChange={e => setProfileForm({ ...profileForm, gitHub: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Short Hero Bio</label>
              <textarea
                value={profileForm.shortBio}
                onChange={e => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                rows={3}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white resize-none"
                required
              />
            </div>
          </div>

          {/* Right panel: About content */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">Detailed About Section Copy</h3>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Introduction Paragraph</label>
              <textarea
                value={aboutForm.introduction}
                onChange={e => setAboutForm({ ...aboutForm, introduction: e.target.value })}
                rows={4}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Career Goal Objective</label>
              <textarea
                value={aboutForm.careerObjective}
                onChange={e => setAboutForm({ ...aboutForm, careerObjective: e.target.value })}
                rows={3}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white resize-none"
                required
              />
            </div>

            {/* Arrays configurations as comma string triggers */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Core Strengths (comma-separated list)
                </label>
                <input
                  type="text"
                  value={aboutForm.strengths.join(', ')}
                  onChange={e => setAboutForm({ ...aboutForm, strengths: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Languages Spoken (comma-separated list)
                </label>
                <input
                  type="text"
                  value={aboutForm.languages.join(', ')}
                  onChange={e => setAboutForm({ ...aboutForm, languages: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Core Interests (comma-separated list)
                </label>
                <input
                  type="text"
                  value={aboutForm.interests.join(', ')}
                  onChange={e => setAboutForm({ ...aboutForm, interests: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs tracking-wider flex items-center space-x-1.5 shadow"
          >
            <Save size={14} />
            <span>Save Profile Modifications</span>
          </button>
        </div>
      </form>
    );
  };

  // 3. SKILLS MATRIX (CRUD)
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState({
    skillName: '',
    category: 'Technical Skills' as const,
    percentage: 85
  });

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.skillName.trim()) {
      toast.error('Please name your skill.');
      return;
    }

    if (editingSkillId) {
      updateSkill({ id: editingSkillId, ...skillForm });
      toast.success('Updated skill metrics.');
      setEditingSkillId(null);
    } else {
      addSkill({ id: 'sk_' + Date.now(), ...skillForm });
      toast.success('Inserted skill competency.');
    }

    setSkillForm({ skillName: '', category: 'Technical Skills', percentage: 85 });
  };

  const handleEditSkill = (s: typeof skills[0]) => {
    setEditingSkillId(s.id);
    setSkillForm({
      skillName: s.skillName,
      category: s.category,
      percentage: s.percentage
    });
  };

  const renderSkills = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Manage Strategic Skills & Categories</h2>
          <p className="text-xs text-slate-400">Perform complete operational CRUD mapping on Arjun's skills.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Form Create/Edit */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 md:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">
              {editingSkillId ? 'Edit Skill parameters' : 'Register New Skill'}
            </h3>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Skill Label Name</label>
                <input
                  type="text"
                  value={skillForm.skillName}
                  onChange={e => setSkillForm({ ...skillForm, skillName: e.target.value })}
                  placeholder="e.g. Compensation Modeling"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category sector</label>
                <select
                  value={skillForm.category}
                  onChange={e => setSkillForm({ ...skillForm, category: e.target.value as any })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                >
                  <option value="Technical Skills">Technical Skills</option>
                  <option value="Management Skills">Management Skills</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Proficiency (Percentage: {skillForm.percentage}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skillForm.percentage}
                  onChange={e => setSkillForm({ ...skillForm, percentage: parseInt(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-grow px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs tracking-wider"
                >
                  {editingSkillId ? 'Update Skill' : 'Create Skill'}
                </button>
                {editingSkillId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSkillId(null);
                      setSkillForm({ skillName: '', category: 'Technical Skills', percentage: 85 });
                    }}
                    className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-500 hover:bg-slate-100 text-xs"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List display */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 md:col-span-7 space-y-4 max-h-[60vh] overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Registered Skills</h3>

            <div className="space-y-2">
              {skills.map(s => (
                <div key={s.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">{s.skillName}</h4>
                    <span className="text-[10px] text-slate-400">{s.category} • {s.percentage}%</span>
                  </div>
                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => handleEditSkill(s)}
                      className="p-1.5 text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                      title="Edit Skill"
                      id={`edit-skill-btn-${s.id}`}
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => promptDelete('Delete Skill?', `Are you absolutely sure you want to remove the skill "${s.skillName}"?`, () => {
                        deleteSkill(s.id);
                        toast.success('Skill deleted successfully.');
                      })}
                      className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                      title="Delete Skill"
                      id={`delete-skill-btn-${s.id}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}

              {skills.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-6">No skills found in cache state.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. PROJECTS INTEGRITY (CRUD)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    projectTitle: '',
    category: 'React' as const,
    description: '',
    objective: '',
    methodology: '',
    outcome: '',
    technologiesUsed: [] as string[],
    gitHubLink: '',
    liveDemoLink: '',
    screenshots: [] as string[],
    videoLink: ''
  });

  const [techInput, setTechInput] = useState('');

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.projectTitle.trim()) {
      toast.error('Title is required.');
      return;
    }

    const cleanedTechList = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const resolvedProj = {
      ...projectForm,
      technologiesUsed: cleanedTechList.length > 0 ? cleanedTechList : projectForm.technologiesUsed
    };

    if (editingProjectId) {
      updateProject({ id: editingProjectId, ...resolvedProj });
      toast.success('Successfully updated project.');
      setEditingProjectId(null);
    } else {
      addProject({
        id: 'proj_' + Date.now(),
        ...resolvedProj,
        screenshots: resolvedProj.screenshots.length > 0 ? resolvedProj.screenshots : ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80']
      });
      toast.success('Successfully added product.');
    }

    // Reset Form
    setProjectForm({
      projectTitle: '',
      category: 'React',
      description: '',
      objective: '',
      methodology: '',
      outcome: '',
      technologiesUsed: [],
      gitHubLink: '',
      liveDemoLink: '',
      screenshots: [],
      videoLink: ''
    });
    setTechInput('');
  };

  const handleEditProject = (p: typeof projects[0]) => {
    setEditingProjectId(p.id);
    setProjectForm({
      projectTitle: p.projectTitle,
      category: p.category,
      description: p.description,
      objective: p.objective,
      methodology: p.methodology,
      outcome: p.outcome,
      technologiesUsed: p.technologiesUsed,
      gitHubLink: p.gitHubLink || '',
      liveDemoLink: p.liveDemoLink || '',
      screenshots: p.screenshots || [],
      videoLink: p.videoLink || ''
    });
    setTechInput(p.technologiesUsed.join(', '));
  };

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const readers = Array.from(e.target.files as FileList).map((f: File) => readAsBase64(f));
      try {
        const results = await Promise.all(readers);
        setProjectForm(prev => ({
          ...prev,
          screenshots: [...prev.screenshots, ...results]
        }));
        toast.success(`Appended ${results.length} visual screen(s) into Base64 format.`);
      } catch {
        toast.error('Could not convert files to byte array representation.');
      }
    }
  };

  const renderProjects = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Manage Applet Projects Registry</h2>
          <p className="text-xs text-slate-400">Perform seamless, complete CRUD on products displayed within the public deck.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Creation card */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">
              {editingProjectId ? 'Modify Project Draft' : 'Add New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Project Title</label>
                  <input
                    type="text"
                    value={projectForm.projectTitle}
                    onChange={e => setProjectForm({ ...projectForm, projectTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category Sector</label>
                  <select
                    value={projectForm.category}
                    onChange={e => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white"
                  >
                    <option value="React">React</option>
                    <option value="Python">Python</option>
                    <option value="Flutter">Flutter</option>
                    <option value="Civil">Civil</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">General Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project Objective</label>
                  <input
                    type="text"
                    value={projectForm.objective}
                    onChange={e => setProjectForm({ ...projectForm, objective: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Methodology</label>
                  <input
                    type="text"
                    value={projectForm.methodology}
                    onChange={e => setProjectForm({ ...projectForm, methodology: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Concrete Outcome</label>
                  <input
                    type="text"
                    value={projectForm.outcome}
                    onChange={e => setProjectForm({ ...projectForm, outcome: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Technologies Used (comma separated grid)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  placeholder="React, Material UI, Google Charts"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">GitHub Repo link</label>
                  <input
                    type="url"
                    value={projectForm.gitHubLink}
                    onChange={e => setProjectForm({ ...projectForm, gitHubLink: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Live Demo link</label>
                  <input
                    type="url"
                    value={projectForm.liveDemoLink}
                    onChange={e => setProjectForm({ ...projectForm, liveDemoLink: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Video Demo link</label>
                  <input
                    type="url"
                    value={projectForm.videoLink}
                    onChange={e => setProjectForm({ ...projectForm, videoLink: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Screenshots (Multiple)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleScreenshotUpload}
                    className="w-full text-[10px] text-slate-500 file:py-1 file:px-2 file:rounded file:border-0 file:bg-indigo-500/10 file:text-indigo-500 file:cursor-pointer"
                  />
                </div>
              </div>

              {projectForm.screenshots.length > 0 && (
                <div className="pt-1.5">
                  <span className="text-[9px] text-slate-400 font-bold block mb-1">Byte attachments queued:</span>
                  <div className="flex flex-wrap gap-2">
                    {projectForm.screenshots.map((s, idx) => (
                      <div key={idx} className="relative w-8 h-8 rounded border border-slate-200 overflow-hidden group">
                        <img src={s} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setProjectForm(prev => ({
                            ...prev,
                            screenshots: prev.screenshots.filter((_, sI) => sI !== idx)
                          }))}
                          className="absolute inset-0 bg-rose-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-grow px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs tracking-wider"
                >
                  {editingProjectId ? 'Save Update' : 'Publish Product'}
                </button>
                {editingProjectId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectForm({
                        projectTitle: '', category: 'React', description: '', objective: '', methodology: '',
                        outcome: '', technologiesUsed: [], gitHubLink: '', liveDemoLink: '', screenshots: [], videoLink: ''
                      });
                      setTechInput('');
                    }}
                    className="px-3 py-2 border rounded-lg text-slate-500 uppercase hover:bg-slate-100 text-xs"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Table registry list */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 lg:col-span-7 space-y-4 max-h-[70vh] overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Projects list</h3>

            <div className="space-y-2">
              {projects.map(p => (
                <div key={p.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">{p.projectTitle}</h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Sector: <strong>{p.category}</strong> • Technologies count: {p.technologiesUsed.length}</span>
                  </div>
                  <div className="flex space-x-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleEditProject(p)}
                      className="p-1.5 text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                      title="Edit project"
                      id={`edit-project-btn-${p.id}`}
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => promptDelete('Delete project?', `Are you absolutely certain you want to scrap the project entry "${p.projectTitle}"?`, () => {
                        deleteProject(p.id);
                        toast.success('Project scrapped.');
                      })}
                      className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                      title="Delete project"
                      id={`delete-project-btn-${p.id}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-6">No project logs found in storage database.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5. CERTIFICATES & EDUCATION (CRUD wrapper)
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({
    title: '',
    organization: '',
    date: '',
    description: '',
    certificateImage: '',
    pdf: ''
  });

  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduForm, setEduForm] = useState({
    degree: '',
    college: '',
    university: '',
    year: '',
    cgpa: '',
    description: ''
  });

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title || !certForm.organization) {
      toast.error('Title and granting body are required.');
      return;
    }

    if (editingCertId) {
      updateCertificate({ id: editingCertId, ...certForm });
      toast.success('Certificate parameters saved.');
      setEditingCertId(null);
    } else {
      addCertificate({
        id: 'cert_' + Date.now(),
        ...certForm,
        certificateImage: certForm.certificateImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80'
      });
      toast.success('Certificate added.');
    }

    setCertForm({ title: '', organization: '', date: '', description: '', certificateImage: '', pdf: '' });
  };

  const handleSaveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.degree || !eduForm.college) {
      toast.error('Degree and college are required.');
      return;
    }

    if (editingEduId) {
      updateEducation({ id: editingEduId, ...eduForm });
      toast.success('Education trace saved.');
      setEditingEduId(null);
    } else {
      addEducation({ id: 'edu_' + Date.now(), ...eduForm });
      toast.success('Added education log.');
    }

    setEduForm({ degree: '', college: '', university: '', year: '', cgpa: '', description: '' });
  };

  const renderCertificatesAndEdu = () => {
    return (
      <div className="space-y-8">
        {/* Certificate Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Manage Accreditations & Certificates</h2>
            <p className="text-xs text-slate-400">Add, edit, or delete credentials displayed dynamically in public cards inspect slides.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {editingCertId ? 'Edit Certificate' : 'Register New Certificate'}
              </h3>
              <form onSubmit={handleSaveCert} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Certificate Title</label>
                  <input
                    type="text"
                    value={certForm.title}
                    onChange={e => setCertForm({ ...certForm, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Granting Organization</label>
                    <input
                      type="text"
                      value={certForm.organization}
                      onChange={e => setCertForm({ ...certForm, organization: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Issue Date</label>
                    <input
                      type="text"
                      value={certForm.date}
                      onChange={e => setCertForm({ ...certForm, date: e.target.value })}
                      placeholder="e.g. Nov 2025"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Description</label>
                  <textarea
                    value={certForm.description}
                    onChange={e => setCertForm({ ...certForm, description: e.target.value })}
                    rows={2}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Certificate Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async e => {
                      if (e.target.files?.[0]) {
                        const base64 = await readAsBase64(e.target.files[0]);
                        setCertForm(prev => ({ ...prev, certificateImage: base64 }));
                      }
                    }}
                    className="w-full text-[10px] file:py-1 file:px-2"
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button type="submit" className="flex-grow px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-xs">
                    {editingCertId ? 'Save Accreditation' : 'Publish Accreditation'}
                  </button>
                  {editingCertId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCertId(null);
                        setCertForm({ title: '', organization: '', date: '', description: '', certificateImage: '', pdf: '' });
                      }}
                      className="px-3 py-1.5 border rounded-lg hover:bg-slate-100"
                    >
                      ×
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-3.5 max-h-[48vh] overflow-y-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Accreditations list</h3>
              <div className="space-y-2">
                {certificates.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{c.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{c.organization} • {c.date}</p>
                    </div>
                    <div className="flex space-x-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingCertId(c.id);
                          setCertForm({
                            title: c.title, organization: c.organization, date: c.date,
                            description: c.description, certificateImage: c.certificateImage, pdf: c.pdf
                          });
                        }}
                        className="p-1 px-1.5 border hover:bg-slate-200 dark:hover:bg-slate-800 rounded"
                        id={`edit-cert-btn-${c.id}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => promptDelete('Delete accreditation?', `Purge "${c.title}" accreditation record?`, () => {
                          deleteCertificate(c.id);
                          toast.success('Certificate removed.');
                        })}
                        className="p-1 px-1.5 hover:bg-rose-100 dark:hover:bg-rose-950 border border-slate-200 text-rose-500 dark:border-slate-800 rounded"
                        id={`delete-cert-btn-${c.id}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Manage Schools & Academic Trails</h2>
            <p className="text-xs text-slate-400">Maintain education courses and GPA transcripts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {editingEduId ? 'Edit Academic trace' : 'Register New Education path'}
              </h3>
              <form onSubmit={handleSaveEdu} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Degree name</label>
                  <input
                    type="text"
                    value={eduForm.degree}
                    onChange={e => setEduForm({ ...eduForm, degree: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">College/Dept</label>
                    <input
                      type="text"
                      value={eduForm.college}
                      onChange={e => setEduForm({ ...eduForm, college: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Affiliated University</label>
                    <input
                      type="text"
                      value={eduForm.university}
                      onChange={e => setEduForm({ ...eduForm, university: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Year Period Range</label>
                    <input
                      type="text"
                      value={eduForm.year}
                      onChange={e => setEduForm({ ...eduForm, year: e.target.value })}
                      placeholder="e.g. 2024 - 2026"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">CGPA / Percentage</label>
                    <input
                      type="text"
                      value={eduForm.cgpa}
                      onChange={e => setEduForm({ ...eduForm, cgpa: e.target.value })}
                      placeholder="e.g. 3.8 / 4.0"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Academics Description</label>
                  <textarea
                    value={eduForm.description}
                    onChange={e => setEduForm({ ...eduForm, description: e.target.value })}
                    rows={2}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 resize-none"
                    required
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button type="submit" className="flex-grow px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-xs">
                    {editingEduId ? 'Save Course' : 'Create Academic Course'}
                  </button>
                  {editingEduId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEduId(null);
                        setEduForm({ degree: '', college: '', university: '', year: '', cgpa: '', description: '' });
                      }}
                      className="px-3 py-1.5 border rounded"
                    >
                      ×
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-3.5 max-h-[48vh] overflow-y-auto w-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Schools database list</h3>
              <div className="space-y-2">
                {education.map(e => (
                  <div key={e.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between text-xs">
                    <div className="pr-4">
                      <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{e.degree}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{e.college} • {e.year}</p>
                    </div>
                    <div className="flex space-x-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingEduId(e.id);
                          setEduForm({
                            degree: e.degree, college: e.college, university: e.university,
                            year: e.year, cgpa: e.cgpa, description: e.description
                          });
                        }}
                        className="p-1 px-1.5 border hover:bg-slate-200 dark:hover:bg-slate-800 rounded"
                        id={`edit-edu-btn-${e.id}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => promptDelete('Delete course?', `Delete course file entry "${e.degree}"?`, () => {
                          deleteEducation(e.id);
                          toast.success('Degree logged out.');
                        })}
                        className="p-1 px-1.5 hover:bg-rose-100 border text-rose-500 border-slate-200 dark:border-slate-800 rounded"
                        id={`delete-edu-btn-${e.id}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 6. EXPERIENCE (CRUD Timeline)
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState({
    company: '',
    role: '',
    duration: '',
    responsibilitiesInput: ''
  });

  const [editingAchId, setEditingAchId] = useState<string | null>(null);
  const [achForm, setAchForm] = useState({
    title: '',
    year: '',
    description: ''
  });

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.company || !expForm.role) {
      toast.error('Company and role are required.');
      return;
    }

    const respList = expForm.responsibilitiesInput.split('\n').map(r => r.trim()).filter(Boolean);

    if (editingExpId) {
      updateExperience({
        id: editingExpId,
        company: expForm.company,
        role: expForm.role,
        duration: expForm.duration,
        responsibilities: respList
      });
      toast.success('Successfully saved experience tenure.');
      setEditingExpId(null);
    } else {
      addExperience({
        id: 'exp_' + Date.now(),
        company: expForm.company,
        role: expForm.role,
        duration: expForm.duration,
        responsibilities: respList
      });
      toast.success('Successfully created tenure.');
    }

    setExpForm({ company: '', role: '', duration: '', responsibilitiesInput: '' });
  };

  const handleSaveAch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achForm.title || !achForm.year) {
      toast.error('Title and year are critical fields.');
      return;
    }

    if (editingAchId) {
      updateAchievement({ id: editingAchId, ...achForm });
      toast.success('Achievement update complete.');
      setEditingAchId(null);
    } else {
      addAchievement({ id: 'ach_' + Date.now(), ...achForm });
      toast.success('Laurel logged.');
    }

    setAchForm({ title: '', year: '', description: '' });
  };

  const renderExperienceTimeline = () => {
    return (
      <div className="space-y-8">
        {/* Industry Tenure */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Manage Professional Tenures (Experience)</h2>
            <p className="text-xs text-slate-400">CRUD records showing the chronological progression of skills in industry environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {editingExpId ? 'Edit Tenure Detail' : 'Add New Work Tenure'}
              </h3>
              <form onSubmit={handleSaveExp} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company / Organization name</label>
                  <input
                    type="text"
                    value={expForm.company}
                    onChange={e => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Role / Designation name</label>
                    <input
                      type="text"
                      value={expForm.role}
                      onChange={e => setExpForm({ ...expForm, role: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration Period</label>
                    <input
                      type="text"
                      value={expForm.duration}
                      onChange={e => setExpForm({ ...expForm, duration: e.target.value })}
                      placeholder="e.g. Jun 2025 - Aug 2025"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Responsibilities (One bullet sentence per line)
                  </label>
                  <textarea
                    value={expForm.responsibilitiesInput}
                    onChange={e => setExpForm({ ...expForm, responsibilitiesInput: e.target.value })}
                    rows={4}
                    placeholder="Wrote robust concrete predictive estimators...&#10;Facilitated human resources alignment for 70+ engineering staff..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 resize-none leading-relaxed"
                    required
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button type="submit" className="flex-grow px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-xs">
                    {editingExpId ? 'Save Work Tenure' : 'Register Work Tenure'}
                  </button>
                  {editingExpId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExpId(null);
                        setExpForm({ company: '', role: '', duration: '', responsibilitiesInput: '' });
                      }}
                      className="px-3 border rounded hover:bg-slate-100"
                    >
                      ×
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-3.5 max-h-[48vh] overflow-y-auto w-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tenures registry list</h3>
              <div className="space-y-2">
                {experience.map(exp => (
                  <div key={exp.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{exp.role}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{exp.company} • {exp.duration}</p>
                    </div>
                    <div className="flex space-x-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingExpId(exp.id);
                          setExpForm({
                            company: exp.company, role: exp.role, duration: exp.duration,
                            responsibilitiesInput: exp.responsibilities.join('\n')
                          });
                        }}
                        className="p-1 px-1.5 border hover:bg-slate-200 dark:hover:bg-slate-800 rounded"
                        id={`edit-exp-btn-${exp.id}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => promptDelete('Delete experience tenure?', `Erase Arjun's tenure record at "${exp.company}"?`, () => {
                          deleteExperience(exp.id);
                          toast.success('Experience record deleted.');
                        })}
                        className="p-1 px-1.5 hover:bg-rose-100 border text-rose-500 border-slate-200 dark:border-slate-800 rounded"
                        id={`delete-exp-btn-${exp.id}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Laurels & achievements */}
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Manage Milestones & Laurels (Achievements)</h2>
            <p className="text-xs text-slate-400">CRUD configurations on scholastic, competitive, or engineering outstanding awards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {editingAchId ? 'Edit Achievement' : 'Register Award'}
              </h3>
              <form onSubmit={handleSaveAch} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">laurel Title</label>
                    <input
                      type="text"
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200"
                      value={achForm.title}
                      onChange={e => setAchForm({ ...achForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Year Achieved</label>
                    <input
                      type="text"
                      placeholder="e.g. 2025"
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200"
                      value={achForm.year}
                      onChange={e => setAchForm({ ...achForm, year: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Brief details description</label>
                  <textarea
                    value={achForm.description}
                    onChange={e => setAchForm({ ...achForm, description: e.target.value })}
                    rows={2}
                    className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 resize-none"
                    required
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button type="submit" className="flex-grow px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded text-xs tracking-wider">
                    {editingAchId ? 'Save Laurel Update' : 'Publish Laurel / Award'}
                  </button>
                  {editingAchId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAchId(null);
                        setAchForm({ title: '', year: '', description: '' });
                      }}
                      className="px-3 hover:bg-slate-100"
                    >
                      ×
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-3.5 max-h-[48vh] overflow-y-auto w-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Awards database list</h3>
              <div className="space-y-2">
                {achievements.map(ach => (
                  <div key={ach.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{ach.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Year: {ach.year}</p>
                    </div>
                    <div className="flex space-x-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingAchId(ach.id);
                          setAchForm({ title: ach.title, year: ach.year, description: ach.description });
                        }}
                        className="p-1 px-1.5 border hover:bg-slate-200 dark:hover:bg-slate-800 rounded"
                        id={`edit-ach-btn-${ach.id}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => promptDelete('Delete laurel?', `Purge award: "${ach.title}"?`, () => {
                          deleteAchievement(ach.id);
                          toast.success('Award removed.');
                        })}
                        className="p-1 px-1.5 hover:bg-rose-100 text-rose-500 border border-slate-200 dark:border-slate-800 rounded"
                        id={`delete-ach-btn-${ach.id}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 7. BLOG ENGINE (CRUD)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    tagsInput: ''
  });

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.description) {
      toast.error('Title and content are required.');
      return;
    }

    const tagsList = blogForm.tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    if (editingBlogId) {
      updateBlog({
        id: editingBlogId,
        title: blogForm.title,
        category: blogForm.category || 'Professional Growth',
        image: blogForm.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
        description: blogForm.description,
        tags: tagsList
      });
      toast.success('Successfully modified blog post.');
      setEditingBlogId(null);
    } else {
      addBlog({
        id: 'blog_' + Date.now(),
        title: blogForm.title,
        category: blogForm.category || 'Professional Growth',
        image: blogForm.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
        description: blogForm.description,
        tags: tagsList
      });
      toast.success('Successfully published article.');
    }

    setBlogForm({ title: '', category: '', image: '', description: '', tagsInput: '' });
  };

  const renderBlogs = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Manage Insights Blog Engine</h2>
          <p className="text-xs text-slate-400">Perform seamless, complete CRUD publishing of articles on public views.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500">
              {editingBlogId ? 'Modify Blog parameters' : 'Write New Article'}
            </h3>
            <form onSubmit={handleSaveBlog} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Article Title</label>
                <input
                  type="text"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200"
                  value={blogForm.title}
                  onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category sector</label>
                  <input
                    type="text"
                    placeholder="e.g. HR Analytics"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200"
                    value={blogForm.category}
                    onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Engineering, Career Path"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200"
                    value={blogForm.tagsInput}
                    onChange={e => setBlogForm({ ...blogForm, tagsInput: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Short summary description</label>
                <textarea
                  value={blogForm.description}
                  onChange={e => setBlogForm({ ...blogForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex justify-between">
                  <span>Cover Image File</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async e => {
                    if (e.target.files?.[0]) {
                      const base64 = await readAsBase64(e.target.files[0]);
                      setBlogForm(prev => ({ ...prev, image: base64 }));
                      toast.success('Byte representation loaded.');
                    }
                  }}
                  className="w-full text-[10px]"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button type="submit" className="flex-grow px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded text-xs tracking-wider">
                  {editingBlogId ? 'Save Changes' : 'Publish Article'}
                </button>
                {editingBlogId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlogId(null);
                      setBlogForm({ title: '', category: '', image: '', description: '', tagsInput: '' });
                    }}
                    className="px-3 py-2 border rounded hover:bg-slate-100"
                  >
                    ×
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 lg:col-span-7 space-y-3.5 max-h-[70vh] overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current published articles</h3>
            <div className="space-y-2">
              {blogs.map(blog => (
                <div key={blog.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between text-xs">
                  <div className="pr-4">
                    <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{blog.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Category: {blog.category}</p>
                  </div>
                  <div className="flex space-x-1 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingBlogId(blog.id);
                        setBlogForm({
                          title: blog.title, category: blog.category, image: blog.image,
                          description: blog.description, tagsInput: blog.tags.join(', ')
                        });
                      }}
                      className="p-1 px-1.5 border hover:bg-slate-200 dark:hover:bg-slate-800 rounded"
                      id={`edit-blog-btn-${blog.id}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => promptDelete('Delete article?', `Delete "${blog.title}" article completely?`, () => {
                        deleteBlog(blog.id);
                        toast.success('Article removed.');
                      })}
                      className="p-1 px-1.5 hover:bg-rose-100 border text-rose-500 border-slate-200 dark:border-slate-800 rounded"
                      id={`delete-blog-btn-${blog.id}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 8. MESSAGES INBOX
  const renderMessages = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Recruiter Message Inbox</h2>
          <p className="text-xs text-slate-400">Audit, read, and delete active requests lodged by visiting talent representatives.</p>
        </div>

        <div className="space-y-3 max-h-[72vh] overflow-y-auto">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.read
                  ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-150 dark:border-slate-800'
                  : 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                  <h3 className="text-xs font-semibold text-slate-800 dark:text-white flex items-center space-x-1.5">
                    <span>{msg.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({msg.email})</span>
                  </h3>
                  <div className="text-[11px] text-slate-500 font-bold mt-1">Subject: {msg.subject}</div>
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                  <span className="font-mono">{msg.date}</span>
                  {!msg.read && (
                    <span className="px-2 py-0.5 rounded-full font-bold text-[9px] bg-amber-500 text-white animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed mt-3 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                {msg.message}
              </p>

              <div className="mt-3 flex justify-end space-x-1.5">
                {!msg.read && (
                  <button
                    onClick={() => {
                      markMessageRead(msg.id);
                      toast.success('Marked request as scrutinized.');
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[10.5px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1 cursor-pointer"
                  >
                    <Check size={11} />
                    <span>Audit Scruntinized</span>
                  </button>
                )}
                <button
                  onClick={() => promptDelete('Erase recruiter bidding notice?', 'Scrap this incoming message permanently?', () => {
                    deleteMessage(msg.id);
                    toast.success('Message scrapped.');
                  })}
                  className="p-1.5 rounded-lg text-rose-500 border border-slate-200 hover:bg-rose-100/50 text-[10.5px] font-bold dark:border-slate-800 cursor-pointer"
                  id={`delete-message-btn-${msg.id}`}
                >
                  Scrap Notice
                </button>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-150">
              <Mail size={32} className="text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-400 italic">No incoming recruiter biddings recorded currently.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 9. SEO PARAMETERS
  const [seoForm, setSeoForm] = useState(seoSettings);

  const saveSeoSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings(seoForm);
    toast.success('SEO parameters updated successfully. Your meta title is active!');
  };

  const renderSeo = () => {
    return (
      <form onSubmit={saveSeoSettings} className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white font-display">Meta SEO Parameters</h2>
          <p className="text-xs text-slate-400">Audit search-crawler keywords, page titles, and description snippets.</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Index Website Title</label>
            <input
              type="text"
              value={seoForm.websiteTitle}
              onChange={e => setSeoForm({ ...seoForm, websiteTitle: e.target.value })}
              className="w-full px-3 py-1.8 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 text-slate-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Meta Description Snippet</label>
            <textarea
              value={seoForm.metaDescription}
              onChange={e => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
              rows={3}
              className="w-full px-3 py-1.8 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 resize-none text-slate-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Crawler Keywords (comma separated)
            </label>
            <input
              type="text"
              value={seoForm.keywords}
              onChange={e => setSeoForm({ ...seoForm, keywords: e.target.value })}
              className="w-full px-3 py-1.8 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 text-slate-800 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs tracking-wider flex items-center space-x-1.5 shadow"
          >
            <Save size={14} />
            <span>Commit SEO tags</span>
          </button>
        </div>
      </form>
    );
  };

  // ==========================================
  // VIEW SWITCHER FOR ACTIVE TAB
  // ==========================================
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'profile': return renderProfile();
      case 'skills': return renderSkills();
      case 'projects': return renderProjects();
      case 'certificates': return renderCertificatesAndEdu();
      case 'experience': return renderExperienceTimeline();
      case 'blogs': return renderBlogs();
      case 'messages': return renderMessages();
      case 'seo': return renderSeo();
      default: return renderOverview();
    }
  };

  const tabs: { id: AdminTab; name: string; icon: React.ReactNode }[] = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={14} /> },
    { id: 'profile', name: 'Bio & About', icon: <User size={14} /> },
    { id: 'skills', name: 'Skills Grid', icon: <Sparkles size={14} /> },
    { id: 'projects', name: 'Projects DB', icon: <FolderGit2 size={14} /> },
    { id: 'certificates', name: 'Certs & Schools', icon: <Award size={14} /> },
    { id: 'experience', name: 'Work & Awards', icon: <Briefcase size={14} /> },
    { id: 'blogs', name: 'Blog Engine', icon: <BookOpen size={14} /> },
    { id: 'messages', name: 'Inbox Logs', icon: <Mail size={14} /> },
    { id: 'seo', name: 'SEO Settings', icon: <Sliders size={14} /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-slate-950 text-white rounded-lg">
                <Settings size={14} className="animate-spin-slow" />
              </span>
              <div>
                <h3 className="font-display font-black text-xs uppercase leading-none tracking-wider">
                  Admin Shell
                </h3>
                <span className="text-[9px] font-bold text-slate-900 leading-none">
                  Authorized controls
                </span>
              </div>
            </div>

            <button
              onClick={triggerLogout}
              className="p-1 rounded hover:bg-slate-950/10 text-slate-900"
              title="Logout session"
              id="admin-logout-btn"
            >
              <LogOut size={16} />
            </button>
          </div>

          {/* Tab lists */}
          <div className="p-2 sm:p-3 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 space-y-1">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              const isUnreadMail = tab.id === 'messages' && messages.filter(m => !m.read).length > 0;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                  id={`admin-tab-btn-${tab.id}`}
                >
                  <span className="flex items-center space-x-2">
                    {tab.icon}
                    <span>{tab.name}</span>
                  </span>
                  {isUnreadMail && (
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                  <ChevronRight size={12} className={isActive ? 'text-slate-950' : 'opacity-40'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Form details container */}
        <div className="lg:col-span-9 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50 shadow-md">
          {renderActiveTabContent()}
        </div>
      </div>

      {/* Delete confirmation dialog box */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title={deleteDialog.title}
        message={deleteDialog.message}
        onConfirm={deleteDialog.onConfirm}
        onCancel={closeDeleteDialog}
      />
    </div>
  );
};
