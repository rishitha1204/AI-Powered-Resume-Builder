import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Plus, FileText, Trash2, Edit3, Download, Clock,
  LogOut, User, LayoutDashboard, ChevronRight, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { resumeAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await resumeAPI.getAll();
      setResumes(data.data || []);
    } catch {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await resumeAPI.delete(id);
      setResumes(prev => prev.filter(r => r._id !== id));
      toast.success('Resume deleted');
    } catch {
      toast.error('Failed to delete resume');
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const templateColors = {
    modern: 'from-primary-500 to-purple-600',
    minimal: 'from-gray-500 to-slate-600',
    creative: 'from-emerald-500 to-teal-600',
    corporate: 'from-blue-500 to-indigo-600',
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-mesh">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-white/5 z-40 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">ResumeAI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 px-4 py-3 bg-primary-600/20 text-primary-300 border border-primary-500/30 rounded-xl">
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <Link to="/builder" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Plus size={18} />
            <span className="text-sm font-medium">New Resume</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 glass rounded-xl mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 p-6 pt-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Resumes</h1>
            <p className="text-gray-400 text-sm mt-1">Manage and create your professional resumes</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleLogout} className="flex md:hidden items-center gap-2 btn-ghost text-sm text-red-400">
              <LogOut size={16} /> Logout
            </button>
            <Link to="/builder" className="btn-primary flex items-center gap-2 text-sm py-2.5">
              <Plus size={16} />
              New Resume
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Resumes', value: resumes.length, icon: FileText, color: 'text-primary-400' },
            { label: 'Last Updated', value: resumes[0] ? new Date(resumes[0].updatedAt).toLocaleDateString() : '—', icon: Clock, color: 'text-emerald-400' },
            { label: 'Templates Used', value: [...new Set(resumes.map(r => r.template))].length || 0, icon: LayoutDashboard, color: 'text-amber-400' },
          ].map(s => (
            <div key={s.label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">{s.label}</span>
                <s.icon size={16} className={s.color} />
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Resumes grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-32 bg-white/5 rounded-xl mb-4" />
                <div className="h-4 w-32 bg-white/10 rounded mb-2" />
                <div className="h-3 w-24 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-16 text-center">
            <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-primary-400" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">No resumes yet</h3>
            <p className="text-gray-400 text-sm mb-6">Create your first professional resume in minutes.</p>
            <Link to="/builder" className="btn-primary inline-flex items-center gap-2">
              <Plus size={16} />
              Create My First Resume
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* New resume card */}
            <Link to="/builder">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 border-2 border-dashed border-white/10 hover:border-primary-500/50 transition-all cursor-pointer h-52 flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-12 h-12 bg-primary-500/20 group-hover:bg-primary-500/30 rounded-xl flex items-center justify-center transition-all">
                  <Plus size={22} className="text-primary-400" />
                </div>
                <p className="text-gray-400 group-hover:text-white font-medium transition-colors text-sm">Create New Resume</p>
              </motion.div>
            </Link>

            {resumes.map((resume, i) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                {/* Preview top */}
                <div className={`h-24 bg-gradient-to-br ${templateColors[resume.template] || templateColors.modern} relative flex items-center justify-center`}>
                  <FileText size={32} className="text-white/30" />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/30 rounded-md text-white text-xs font-medium capitalize">{resume.template}</div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm truncate mb-1">{resume.title || 'Untitled Resume'}</h3>
                  <p className="text-gray-500 text-xs mb-1">{resume.personalInfo?.fullName || 'No name set'}</p>
                  <div className="flex items-center gap-1 text-gray-600 text-xs">
                    <Clock size={10} />
                    <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link to={`/builder/${resume._id}`} className="flex-1 flex items-center justify-center gap-1.5 bg-primary-600/20 hover:bg-primary-600/30 text-primary-300 border border-primary-500/30 rounded-lg py-2 text-xs font-medium transition-all">
                      <Edit3 size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(resume._id)}
                      disabled={deleting === resume._id}
                      className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg py-2 px-3 text-xs font-medium transition-all"
                    >
                      {deleting === resume._id ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" /> : <Trash2 size={12} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
