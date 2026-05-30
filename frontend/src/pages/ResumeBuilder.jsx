import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, GraduationCap, Wrench, Briefcase, Code2, Award, Trophy,
  Sparkles, Save, Download, ChevronLeft, ChevronRight, Plus, Trash2,
  Loader2, LayoutTemplate, Eye, Edit3, ArrowLeft, Wand2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { resumeAPI, aiAPI } from '../services/api';
import toast from 'react-hot-toast';
import ResumePreview from '../components/resume/ResumePreview';

const STEPS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
];

const TEMPLATES = [
  { id: 'modern', name: 'Modern Pro', color: '#6550fa' },
  { id: 'minimal', name: 'Minimal ATS', color: '#475569' },
  { id: 'creative', name: 'Creative', color: '#059669' },
  { id: 'corporate', name: 'Corporate', color: '#1d4ed8' },
];

const defaultResume = {
  title: 'My Resume',
  template: 'modern',
  themeColor: '#6550fa',
  personalInfo: { fullName: '', email: '', phone: '', address: '', linkedin: '', github: '', portfolio: '', summary: '' },
  education: [{ college: '', degree: '', branch: '', cgpa: '', startYear: '', endYear: '' }],
  skills: [],
  experience: [{ company: '', role: '', duration: '', description: '' }],
  projects: [{ title: '', technologies: '', description: '', githubLink: '', liveLink: '' }],
  certifications: [{ name: '', issuer: '', date: '', link: '' }],
  achievements: [{ title: '', description: '' }],
};

export default function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resume, setResume] = useState(defaultResume);
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      resumeAPI.getById(id)
        .then(({ data }) => setResume(data.data))
        .catch(() => toast.error('Failed to load resume'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Auto-save every 30s
  useEffect(() => {
    if (!id) return;
    const timer = setInterval(() => handleSave(true), 30000);
    return () => clearInterval(timer);
  }, [resume, id]);

  const update = (field, value) => setResume(prev => ({ ...prev, [field]: value }));
  const updatePersonal = (field, value) => setResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

  const updateList = (listName, index, field, value) => {
    setResume(prev => {
      const list = [...prev[listName]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listName]: list };
    });
  };

  const addListItem = (listName, template) => {
    setResume(prev => ({ ...prev, [listName]: [...prev[listName], template] }));
  };

  const removeListItem = (listName, index) => {
    setResume(prev => ({ ...prev, [listName]: prev[listName].filter((_, i) => i !== index) }));
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const skill = skillInput.trim();
      if (skill && !resume.skills.includes(skill)) {
        update('skills', [...resume.skills, skill]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    update('skills', resume.skills.filter(s => s !== skill));
  };

  const handleSave = async (silent = false) => {
    setSaving(true);
    try {
      if (id) {
        await resumeAPI.update(id, resume);
        if (!silent) toast.success('Resume saved!');
      } else {
        const { data } = await resumeAPI.create(resume);
        navigate(`/builder/${data.data._id}`, { replace: true });
        if (!silent) toast.success('Resume created!');
      }
    } catch {
      if (!silent) toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const generateAISummary = async () => {
    setAiLoading(true);
    try {
      const { data } = await aiAPI.generateSummary({
        name: resume.personalInfo.fullName,
        skills: resume.skills,
        experience: resume.experience,
        education: resume.education,
        projects: resume.projects,
      });
      updatePersonal('summary', data.data);
      toast.success(data.fallback ? 'Summary generated (AI offline, used template)' : 'AI summary generated! ✨');
    } catch {
      toast.error('Failed to generate summary');
    } finally {
      setAiLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    toast.loading('Preparing PDF...');
    const { default: html2pdf } = await import('html2pdf.js');
    const element = document.getElementById('resume-preview-pdf');
    if (!element) { toast.dismiss(); toast.error('Preview not found'); return; }
    const opt = {
      margin: 0,
      filename: `${resume.personalInfo.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    await html2pdf().set(opt).from(element).save();
    toast.dismiss();
    toast.success('PDF downloaded!');
  };

  if (loading) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <Loader2 size={32} className="text-primary-400 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <input
            type="text"
            value={resume.title}
            onChange={e => update('title', e.target.value)}
            className="bg-transparent text-white font-semibold text-sm focus:outline-none border-b border-transparent focus:border-primary-500/50 transition-all px-1"
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPreview(!showPreview)} className="btn-ghost flex items-center gap-2 text-sm">
            {showPreview ? <Edit3 size={15} /> : <Eye size={15} />}
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={handleDownloadPDF} className="btn-secondary flex items-center gap-2 text-sm py-2.5">
            <Download size={15} />
            PDF
          </button>
          <button onClick={() => handleSave()} disabled={saving} className="btn-primary flex items-center gap-2 text-sm py-2.5">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            Save
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Steps sidebar */}
        <aside className="w-52 glass border-r border-white/5 flex flex-col py-6 px-3 gap-1 hidden md:flex">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                step === i
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <s.icon size={16} />
              {s.label}
              {step === i && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />}
            </button>
          ))}

          <div className="mt-6 px-3">
            <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-3">Template</p>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => update('template', t.id)}
                  className={`h-10 rounded-lg border transition-all text-xs font-medium ${
                    resume.template === t.id
                      ? 'border-primary-500 text-primary-300 bg-primary-500/20'
                      : 'border-white/10 text-gray-500 hover:border-white/20'
                  }`}
                  style={{ borderTopColor: resume.template === t.id ? t.color : undefined }}
                >
                  {t.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Form area */}
        <div className={`${showPreview ? 'hidden lg:flex' : 'flex'} flex-1 flex-col overflow-y-auto p-6`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl w-full mx-auto"
            >
              {/* Step: Personal Info */}
              {step === 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Personal Information</h2>
                  <p className="text-gray-400 text-sm mb-6">Your basic contact and profile details.</p>

                  <div className="section-card space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">Full Name *</label>
                        <input className="input-field" placeholder="John Doe" value={resume.personalInfo.fullName} onChange={e => updatePersonal('fullName', e.target.value)} />
                      </div>
                      <div>
                        <label className="label">Email *</label>
                        <input type="email" className="input-field" placeholder="john@example.com" value={resume.personalInfo.email} onChange={e => updatePersonal('email', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">Phone</label>
                        <input className="input-field" placeholder="+91 9999999999" value={resume.personalInfo.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                      </div>
                      <div>
                        <label className="label">Address</label>
                        <input className="input-field" placeholder="City, State" value={resume.personalInfo.address} onChange={e => updatePersonal('address', e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">LinkedIn</label>
                        <input className="input-field" placeholder="linkedin.com/in/johndoe" value={resume.personalInfo.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
                      </div>
                      <div>
                        <label className="label">GitHub</label>
                        <input className="input-field" placeholder="github.com/johndoe" value={resume.personalInfo.github} onChange={e => updatePersonal('github', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="label">Portfolio</label>
                      <input className="input-field" placeholder="johndoe.dev" value={resume.personalInfo.portfolio} onChange={e => updatePersonal('portfolio', e.target.value)} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="label mb-0">Professional Summary</label>
                        <button
                          onClick={generateAISummary}
                          disabled={aiLoading}
                          className="flex items-center gap-1.5 text-xs bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 border border-primary-500/30 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                          Generate with AI
                        </button>
                      </div>
                      <textarea
                        rows={4}
                        className="input-field resize-none"
                        placeholder="A brief professional summary about yourself..."
                        value={resume.personalInfo.summary}
                        onChange={e => updatePersonal('summary', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step: Education */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Education</h2>
                  <p className="text-gray-400 text-sm mb-6">Your academic background and qualifications.</p>
                  {resume.education.map((edu, i) => (
                    <div key={i} className="section-card">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-primary-300 text-sm font-semibold">Education {i + 1}</span>
                        {resume.education.length > 1 && (
                          <button onClick={() => removeListItem('education', i)} className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="label">College / University</label>
                          <input className="input-field" placeholder="IIT Bombay" value={edu.college} onChange={e => updateList('education', i, 'college', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="label">Degree</label>
                            <input className="input-field" placeholder="B.Tech" value={edu.degree} onChange={e => updateList('education', i, 'degree', e.target.value)} />
                          </div>
                          <div>
                            <label className="label">Branch / Major</label>
                            <input className="input-field" placeholder="Computer Science" value={edu.branch} onChange={e => updateList('education', i, 'branch', e.target.value)} />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="label">CGPA / %</label>
                            <input className="input-field" placeholder="8.5" value={edu.cgpa} onChange={e => updateList('education', i, 'cgpa', e.target.value)} />
                          </div>
                          <div>
                            <label className="label">Start Year</label>
                            <input className="input-field" placeholder="2020" value={edu.startYear} onChange={e => updateList('education', i, 'startYear', e.target.value)} />
                          </div>
                          <div>
                            <label className="label">End Year</label>
                            <input className="input-field" placeholder="2024" value={edu.endYear} onChange={e => updateList('education', i, 'endYear', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addListItem('education', { college: '', degree: '', branch: '', cgpa: '', startYear: '', endYear: '' })}
                    className="w-full py-3 border-2 border-dashed border-white/10 hover:border-primary-500/40 text-gray-500 hover:text-primary-300 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Education
                  </button>
                </div>
              )}

              {/* Step: Skills */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Skills</h2>
                  <p className="text-gray-400 text-sm mb-6">Add your technical and soft skills.</p>
                  <div className="section-card">
                    <label className="label">Add Skills (press Enter or comma to add)</label>
                    <input
                      className="input-field mb-4"
                      placeholder="React, Node.js, Python..."
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={addSkill}
                    />
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map(skill => (
                        <span key={skill} className="tag cursor-pointer group" onClick={() => removeSkill(skill)}>
                          {skill}
                          <span className="text-red-400 hidden group-hover:inline">×</span>
                        </span>
                      ))}
                      {resume.skills.length === 0 && <p className="text-gray-600 text-sm">No skills added yet</p>}
                    </div>
                    {/* Suggested skills */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-xs text-gray-500 mb-2">Quick add popular skills:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'TypeScript', 'MongoDB'].map(s => (
                          !resume.skills.includes(s) && (
                            <button key={s} onClick={() => update('skills', [...resume.skills, s])}
                              className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all">
                              + {s}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step: Experience */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Work Experience</h2>
                  <p className="text-gray-400 text-sm mb-6">Internships and work experience.</p>
                  {resume.experience.map((exp, i) => (
                    <div key={i} className="section-card">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-primary-300 text-sm font-semibold">Experience {i + 1}</span>
                        {resume.experience.length > 1 && (
                          <button onClick={() => removeListItem('experience', i)} className="text-red-400 hover:text-red-300"><Trash2 size={15} /></button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="label">Company Name</label>
                            <input className="input-field" placeholder="Google" value={exp.company} onChange={e => updateList('experience', i, 'company', e.target.value)} />
                          </div>
                          <div>
                            <label className="label">Role / Position</label>
                            <input className="input-field" placeholder="Software Engineer Intern" value={exp.role} onChange={e => updateList('experience', i, 'role', e.target.value)} />
                          </div>
                        </div>
                        <div>
                          <label className="label">Duration</label>
                          <input className="input-field" placeholder="June 2023 – Aug 2023" value={exp.duration} onChange={e => updateList('experience', i, 'duration', e.target.value)} />
                        </div>
                        <div>
                          <label className="label">Description</label>
                          <textarea rows={3} className="input-field resize-none" placeholder="• Developed features using React and Node.js..." value={exp.description} onChange={e => updateList('experience', i, 'description', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addListItem('experience', { company: '', role: '', duration: '', description: '' })}
                    className="w-full py-3 border-2 border-dashed border-white/10 hover:border-primary-500/40 text-gray-500 hover:text-primary-300 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                    <Plus size={16} /> Add Experience
                  </button>
                </div>
              )}

              {/* Step: Projects */}
              {step === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Projects</h2>
                  <p className="text-gray-400 text-sm mb-6">Showcase your best projects.</p>
                  {resume.projects.map((proj, i) => (
                    <div key={i} className="section-card">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-primary-300 text-sm font-semibold">Project {i + 1}</span>
                        {resume.projects.length > 1 && (
                          <button onClick={() => removeListItem('projects', i)} className="text-red-400 hover:text-red-300"><Trash2 size={15} /></button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="label">Project Title</label>
                          <input className="input-field" placeholder="E-Commerce Platform" value={proj.title} onChange={e => updateList('projects', i, 'title', e.target.value)} />
                        </div>
                        <div>
                          <label className="label">Technologies Used</label>
                          <input className="input-field" placeholder="React, Node.js, MongoDB" value={proj.technologies} onChange={e => updateList('projects', i, 'technologies', e.target.value)} />
                        </div>
                        <div>
                          <label className="label">Description</label>
                          <textarea rows={3} className="input-field resize-none" placeholder="Built a full-stack e-commerce platform with..." value={proj.description} onChange={e => updateList('projects', i, 'description', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="label">GitHub Link</label>
                            <input className="input-field" placeholder="github.com/..." value={proj.githubLink} onChange={e => updateList('projects', i, 'githubLink', e.target.value)} />
                          </div>
                          <div>
                            <label className="label">Live Link</label>
                            <input className="input-field" placeholder="myproject.vercel.app" value={proj.liveLink} onChange={e => updateList('projects', i, 'liveLink', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addListItem('projects', { title: '', technologies: '', description: '', githubLink: '', liveLink: '' })}
                    className="w-full py-3 border-2 border-dashed border-white/10 hover:border-primary-500/40 text-gray-500 hover:text-primary-300 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                    <Plus size={16} /> Add Project
                  </button>
                </div>
              )}

              {/* Step: Certifications */}
              {step === 5 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Certifications</h2>
                  <p className="text-gray-400 text-sm mb-6">Professional certifications and courses.</p>
                  {resume.certifications.map((cert, i) => (
                    <div key={i} className="section-card">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-primary-300 text-sm font-semibold">Certification {i + 1}</span>
                        {resume.certifications.length > 1 && (
                          <button onClick={() => removeListItem('certifications', i)} className="text-red-400 hover:text-red-300"><Trash2 size={15} /></button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="label">Certification Name</label>
                            <input className="input-field" placeholder="AWS Solutions Architect" value={cert.name} onChange={e => updateList('certifications', i, 'name', e.target.value)} />
                          </div>
                          <div>
                            <label className="label">Issuing Organization</label>
                            <input className="input-field" placeholder="Amazon Web Services" value={cert.issuer} onChange={e => updateList('certifications', i, 'issuer', e.target.value)} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="label">Date</label>
                            <input className="input-field" placeholder="Dec 2023" value={cert.date} onChange={e => updateList('certifications', i, 'date', e.target.value)} />
                          </div>
                          <div>
                            <label className="label">Certificate Link</label>
                            <input className="input-field" placeholder="credential URL" value={cert.link} onChange={e => updateList('certifications', i, 'link', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addListItem('certifications', { name: '', issuer: '', date: '', link: '' })}
                    className="w-full py-3 border-2 border-dashed border-white/10 hover:border-primary-500/40 text-gray-500 hover:text-primary-300 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                    <Plus size={16} /> Add Certification
                  </button>
                </div>
              )}

              {/* Step: Achievements */}
              {step === 6 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Achievements</h2>
                  <p className="text-gray-400 text-sm mb-6">Awards, honors, and notable accomplishments.</p>
                  {resume.achievements.map((ach, i) => (
                    <div key={i} className="section-card">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-primary-300 text-sm font-semibold">Achievement {i + 1}</span>
                        {resume.achievements.length > 1 && (
                          <button onClick={() => removeListItem('achievements', i)} className="text-red-400 hover:text-red-300"><Trash2 size={15} /></button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="label">Achievement Title</label>
                          <input className="input-field" placeholder="1st Place in Hackathon" value={ach.title} onChange={e => updateList('achievements', i, 'title', e.target.value)} />
                        </div>
                        <div>
                          <label className="label">Description</label>
                          <textarea rows={2} className="input-field resize-none" placeholder="Won first place in..." value={ach.description} onChange={e => updateList('achievements', i, 'description', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addListItem('achievements', { title: '', description: '' })}
                    className="w-full py-3 border-2 border-dashed border-white/10 hover:border-primary-500/40 text-gray-500 hover:text-primary-300 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                    <Plus size={16} /> Add Achievement
                  </button>
                </div>
              )}

              {/* Step navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="btn-secondary flex items-center gap-2 text-sm py-2.5 disabled:opacity-40"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-gray-500 text-xs">{step + 1} / {STEPS.length}</span>
                {step < STEPS.length - 1 ? (
                  <button onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))} className="btn-primary flex items-center gap-2 text-sm py-2.5">
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button onClick={() => handleSave()} disabled={saving} className="btn-primary flex items-center gap-2 text-sm py-2.5">
                    {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                    Save Resume
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Preview panel */}
        <div className={`${showPreview ? 'flex' : 'hidden lg:flex'} flex-1 bg-dark-800 border-l border-white/5 overflow-y-auto`}>
          <div className="w-full p-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4 self-start">
              <Eye size={15} className="text-gray-400" />
              <span className="text-gray-400 text-sm font-medium">Live Preview</span>
            </div>
            <div className="w-full max-w-[700px] shadow-2xl" id="resume-preview-pdf">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
