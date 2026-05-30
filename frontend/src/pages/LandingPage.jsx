import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Download, ChevronRight, Star, Check, ArrowRight, Brain, FileText, Palette } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const features = [
  { icon: Brain, title: 'AI-Powered Writing', desc: 'Generate professional summaries, objectives, and improvement tips using advanced AI.', color: 'from-violet-500 to-purple-600' },
  { icon: Zap, title: 'Real-Time Preview', desc: 'See your resume update instantly as you type. No lag, no delays.', color: 'from-amber-500 to-orange-600' },
  { icon: Palette, title: '4 Pro Templates', desc: 'Choose from Modern, Minimal, Creative, and Corporate designs.', color: 'from-emerald-500 to-teal-600' },
  { icon: Shield, title: 'ATS-Friendly', desc: 'Our resumes pass Applicant Tracking Systems to get you more interviews.', color: 'from-blue-500 to-cyan-600' },
  { icon: Download, title: 'PDF Export', desc: 'Download a high-quality, print-ready PDF of your resume anytime.', color: 'from-pink-500 to-rose-600' },
  { icon: FileText, title: 'Multiple Resumes', desc: 'Create and manage multiple resumes for different job applications.', color: 'from-indigo-500 to-blue-600' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer @ Google', text: 'Got my dream job after using ResumeAI! The AI summary was perfect and the ATS score helped me optimize everything.', stars: 5, avatar: 'PS' },
  { name: 'Rahul Mehta', role: 'Data Scientist @ Microsoft', text: 'Created a professional resume in under 30 minutes. The templates are beautiful and the AI suggestions were spot-on.', stars: 5, avatar: 'RM' },
  { name: 'Ananya Patel', role: 'Frontend Developer @ Swiggy', text: 'As a fresher, I had no idea how to write a resume. ResumeAI guided me through every section perfectly.', stars: 5, avatar: 'AP' },
];

const faqs = [
  { q: 'Is ResumeAI free to use?', a: 'Yes! You can create and download resumes for free. Premium features like AI generation are available with an API key.' },
  { q: 'Are the resumes ATS-compatible?', a: 'Absolutely. All our templates are designed to pass Applicant Tracking Systems used by top companies.' },
  { q: 'Can I create multiple resumes?', a: 'Yes, you can create unlimited resumes and customize each one for different job roles.' },
  { q: 'How does the AI summary work?', a: 'Our AI analyzes your skills, experience, and education to generate a professional, tailored summary in seconds.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 bg-mesh overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">ResumeAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
            <Link to="/register" className="btn-primary text-sm py-2.5 px-5">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-24 px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-primary-300 border border-primary-500/30 mb-8"
          >
            <Sparkles size={14} />
            <span>AI-Powered Resume Builder — Get Hired Faster</span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Build Your{' '}
            <span className="gradient-text">Dream Resume</span>
            <br />in Minutes
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Create ATS-friendly, professional resumes with AI assistance. Choose from beautiful templates, get AI-generated summaries, and land more interviews.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-base py-4 px-8">
              <Sparkles size={18} />
              Build My Resume Free
              <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-secondary flex items-center justify-center gap-2 text-base py-4 px-8">
              Sign In to Dashboard
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500"
          >
            {['No credit card required', 'Free forever', 'ATS optimized'].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <Check size={14} className="text-primary-400" />
                <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual - mock resume cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl mx-auto mt-20 relative"
        >
          <div className="glass-card p-2 glow-border animated-border">
            <div className="bg-dark-800 rounded-xl overflow-hidden">
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-dark-700 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 bg-dark-600 rounded-md px-3 py-1 text-xs text-gray-500">resumeai.app/builder</div>
              </div>
              {/* Mock builder UI */}
              <div className="flex h-72 gap-0">
                <div className="w-72 bg-dark-800 p-4 border-r border-white/5 flex flex-col gap-3">
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Resume Sections</div>
                  {['Personal Info', 'Education', 'Skills', 'Experience', 'Projects'].map((s, i) => (
                    <div key={s} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer ${i === 0 ? 'bg-primary-600/20 text-primary-300 border border-primary-500/30' : 'text-gray-400 hover:bg-white/5'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-primary-400' : 'bg-gray-600'}`} />
                      {s}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-6 bg-dark-900">
                  <div className="h-full bg-white rounded-lg p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">JD</div>
                      <div>
                        <div className="h-3 w-28 bg-gray-800 rounded" />
                        <div className="h-2 w-20 bg-gray-300 rounded mt-1.5" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-1">
                      {['john@email.com', '+91 9999999999', 'github.com/john'].map(t => (
                        <div key={t} className="h-2 w-24 bg-gray-200 rounded" />
                      ))}
                    </div>
                    <div className="border-t pt-3 mt-1">
                      <div className="h-2.5 w-16 bg-primary-600 rounded mb-2" />
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full bg-gray-200 rounded" />
                        <div className="h-1.5 w-4/5 bg-gray-200 rounded" />
                        <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {['React', 'Node.js', 'MongoDB', 'Python', 'AWS'].map(s => (
                        <span key={s} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full border border-primary-200">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Powerful features to create resumes that stand out and get you hired.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:border-primary-500/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-24 px-6 bg-dark-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Beautiful Templates</h2>
            <p className="text-gray-400 text-lg">Choose from 4 professionally designed, ATS-optimized templates.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Modern Pro', color: '#6550fa', accent: '#8578ff' },
              { name: 'Minimal ATS', color: '#1a1a2e', accent: '#64748b' },
              { name: 'Creative', color: '#059669', accent: '#34d399' },
              { name: 'Corporate', color: '#1e3a5f', accent: '#3b82f6' },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="glass-card p-2 group-hover:glow-border transition-all duration-300 group-hover:scale-105">
                  <div className="bg-white rounded-lg h-52 overflow-hidden relative">
                    <div className="h-16 w-full" style={{ backgroundColor: t.color }} />
                    <div className="p-3 space-y-2">
                      <div className="h-2 w-24 rounded" style={{ backgroundColor: t.accent + '60' }} />
                      <div className="h-1.5 w-full bg-gray-200 rounded" />
                      <div className="h-1.5 w-4/5 bg-gray-200 rounded" />
                      <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
                      <div className="flex gap-1.5 flex-wrap mt-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-4 w-10 rounded-full" style={{ backgroundColor: t.accent + '40' }} />
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                      <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full">Use Template</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-300 font-medium mt-2 pb-1">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Loved by Job Seekers</h2>
            <p className="text-gray-400 text-lg">Thousands of users landed their dream jobs using ResumeAI.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-dark-800/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="text-white font-semibold mb-2">{f.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-purple-600/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Building Today</h2>
              <p className="text-gray-400 text-lg mb-8">Join thousands of job seekers who landed their dream jobs with ResumeAI.</p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-base py-4 px-10">
                <Sparkles size={18} />
                Build My Resume — It's Free
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="text-white font-bold">ResumeAI</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 ResumeAI. Built with ❤️ for job seekers.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
