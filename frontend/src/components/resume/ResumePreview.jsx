// ResumePreview.jsx — renders the actual resume with 4 templates
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

export default function ResumePreview({ resume }) {
  const { template = 'modern' } = resume;

  if (template === 'minimal') return <MinimalTemplate resume={resume} />;
  if (template === 'creative') return <CreativeTemplate resume={resume} />;
  if (template === 'corporate') return <CorporateTemplate resume={resume} />;
  return <ModernTemplate resume={resume} />;
}

// ─── MODERN TEMPLATE ─────────────────────────────────────────────────────────
function ModernTemplate({ resume }) {
  const { personalInfo: p = {}, education = [], skills = [], experience = [], projects = [], certifications = [], achievements = [] } = resume;
  const color = resume.themeColor || '#6550fa';

  return (
    <div className="resume-page bg-white text-gray-800 font-sans" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ background: color }} className="px-8 py-8 text-white">
        <h1 className="text-3xl font-bold mb-1">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90 mt-3">
          {p.email && <span className="flex items-center gap-1.5"><Mail size={13} />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1.5"><Phone size={13} />{p.phone}</span>}
          {p.address && <span className="flex items-center gap-1.5"><MapPin size={13} />{p.address}</span>}
          {p.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={13} />{p.linkedin}</span>}
          {p.github && <span className="flex items-center gap-1.5"><Github size={13} />{p.github}</span>}
          {p.portfolio && <span className="flex items-center gap-1.5"><Globe size={13} />{p.portfolio}</span>}
        </div>
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Summary */}
        {p.summary && (
          <Section title="Professional Summary" color={color}>
            <p className="text-sm text-gray-600 leading-relaxed">{p.summary}</p>
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="Skills" color={color}>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="px-3 py-1 text-xs font-medium rounded-full border" style={{ borderColor: color + '60', color, background: color + '15' }}>{s}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Experience */}
        {experience.some(e => e.company) && (
          <Section title="Work Experience" color={color}>
            {experience.filter(e => e.company).map((e, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{e.role}</h4>
                    <p className="text-xs text-gray-500 font-medium">{e.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{e.duration}</span>
                </div>
                {e.description && <p className="text-xs text-gray-600 mt-1.5 leading-relaxed whitespace-pre-line">{e.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {projects.some(p => p.title) && (
          <Section title="Projects" color={color}>
            {projects.filter(p => p.title).map((proj, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{proj.title}</h4>
                  {proj.githubLink && <a href={proj.githubLink} className="text-gray-400 hover:text-gray-600"><ExternalLink size={11} /></a>}
                  {proj.liveLink && <a href={proj.liveLink} className="text-gray-400 hover:text-gray-600"><Globe size={11} /></a>}
                </div>
                {proj.technologies && <p className="text-xs font-medium mb-1" style={{ color }}>{proj.technologies}</p>}
                {proj.description && <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {education.some(e => e.college) && (
          <Section title="Education" color={color}>
            {education.filter(e => e.college).map((e, i) => (
              <div key={i} className="flex justify-between mb-3 last:mb-0">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{e.degree} {e.branch && `— ${e.branch}`}</h4>
                  <p className="text-xs text-gray-500">{e.college}</p>
                  {e.cgpa && <p className="text-xs text-gray-400">CGPA: {e.cgpa}</p>}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </Section>
        )}

        {/* Certifications */}
        {certifications.some(c => c.name) && (
          <Section title="Certifications" color={color}>
            {certifications.filter(c => c.name).map((c, i) => (
              <div key={i} className="flex justify-between mb-2 last:mb-0">
                <div>
                  <span className="text-sm font-medium text-gray-800">{c.name}</span>
                  {c.issuer && <span className="text-xs text-gray-500 ml-2">— {c.issuer}</span>}
                </div>
                <span className="text-xs text-gray-400">{c.date}</span>
              </div>
            ))}
          </Section>
        )}

        {/* Achievements */}
        {achievements.some(a => a.title) && (
          <Section title="Achievements" color={color}>
            {achievements.filter(a => a.title).map((a, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <span className="text-sm font-semibold text-gray-800">• {a.title}</span>
                {a.description && <p className="text-xs text-gray-500 ml-3">{a.description}</p>}
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-widest mb-3 pb-1.5 border-b" style={{ color, borderColor: color + '40' }}>{title}</h3>
      {children}
    </div>
  );
}

// ─── MINIMAL TEMPLATE ────────────────────────────────────────────────────────
function MinimalTemplate({ resume }) {
  const { personalInfo: p = {}, education = [], skills = [], experience = [], projects = [], certifications = [], achievements = [] } = resume;

  return (
    <div className="resume-page bg-white text-gray-800" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', padding: '40px', minHeight: '297mm' }}>
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{p.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-2">
          {[p.email, p.phone, p.address, p.linkedin, p.github].filter(Boolean).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {p.summary && (
        <div className="mb-5">
          <p className="text-sm text-gray-600 leading-relaxed">{p.summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <MinSection title="SKILLS">
          <p className="text-sm text-gray-600">{skills.join(' · ')}</p>
        </MinSection>
      )}

      {experience.some(e => e.company) && (
        <MinSection title="EXPERIENCE">
          {experience.filter(e => e.company).map((e, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <strong className="text-sm">{e.role}, {e.company}</strong>
                <span className="text-xs text-gray-400">{e.duration}</span>
              </div>
              {e.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed whitespace-pre-line">{e.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {projects.some(p => p.title) && (
        <MinSection title="PROJECTS">
          {projects.filter(p => p.title).map((proj, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-2">
                <strong className="text-sm">{proj.title}</strong>
                {proj.technologies && <span className="text-xs text-gray-400">({proj.technologies})</span>}
              </div>
              {proj.description && <p className="text-xs text-gray-500 mt-0.5">{proj.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {education.some(e => e.college) && (
        <MinSection title="EDUCATION">
          {education.filter(e => e.college).map((e, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <strong className="text-sm">{e.degree} in {e.branch}</strong>
                <p className="text-xs text-gray-500">{e.college} {e.cgpa && `· CGPA: ${e.cgpa}`}</p>
              </div>
              <span className="text-xs text-gray-400">{e.startYear}–{e.endYear}</span>
            </div>
          ))}
        </MinSection>
      )}

      {certifications.some(c => c.name) && (
        <MinSection title="CERTIFICATIONS">
          {certifications.filter(c => c.name).map((c, i) => (
            <p key={i} className="text-sm text-gray-700">• {c.name} {c.issuer && `— ${c.issuer}`} {c.date && `(${c.date})`}</p>
          ))}
        </MinSection>
      )}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-gray-400 tracking-widest mb-2">{title}</h3>
      {children}
    </div>
  );
}

// ─── CREATIVE TEMPLATE ───────────────────────────────────────────────────────
function CreativeTemplate({ resume }) {
  const { personalInfo: p = {}, education = [], skills = [], experience = [], projects = [], certifications = [] } = resume;
  const color = '#059669';

  return (
    <div className="resume-page bg-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'flex', minHeight: '297mm' }}>
      {/* Sidebar */}
      <div style={{ background: color, width: '200px', minWidth: '200px', padding: '30px 20px', color: 'white' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          {p.fullName?.charAt(0) || 'J'}
        </div>
        <h1 style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1.2', marginBottom: '4px' }}>{p.fullName || 'Your Name'}</h1>

        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7, marginBottom: '10px' }}>Contact</h3>
          {[p.email, p.phone, p.address, p.linkedin, p.github].filter(Boolean).map((item, i) => (
            <p key={i} style={{ fontSize: '9px', opacity: 0.85, marginBottom: '5px', wordBreak: 'break-all' }}>{item}</p>
          ))}
        </div>

        {skills.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7, marginBottom: '10px' }}>Skills</h3>
            {skills.map(s => (
              <div key={s} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '4px', padding: '3px 8px', fontSize: '9px', marginBottom: '4px' }}>{s}</div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '30px', overflowX: 'hidden' }}>
        {p.summary && (
          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: `2px solid ${color}20` }}>
            <p style={{ fontSize: '11px', lineHeight: '1.7', color: '#555' }}>{p.summary}</p>
          </div>
        )}

        {experience.some(e => e.company) && (
          <CreSection title="Experience" color={color}>
            {experience.filter(e => e.company).map((e, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '12px' }}>{e.role}</p>
                    <p style={{ fontSize: '11px', color: color }}>{e.company}</p>
                  </div>
                  <span style={{ fontSize: '10px', color: '#888' }}>{e.duration}</span>
                </div>
                {e.description && <p style={{ fontSize: '10px', color: '#666', marginTop: '4px', lineHeight: '1.5' }}>{e.description}</p>}
              </div>
            ))}
          </CreSection>
        )}

        {projects.some(p => p.title) && (
          <CreSection title="Projects" color={color}>
            {projects.filter(p => p.title).map((proj, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', fontSize: '12px' }}>{proj.title}</p>
                {proj.technologies && <p style={{ fontSize: '10px', color: color }}>{proj.technologies}</p>}
                {proj.description && <p style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>{proj.description}</p>}
              </div>
            ))}
          </CreSection>
        )}

        {education.some(e => e.college) && (
          <CreSection title="Education" color={color}>
            {education.filter(e => e.college).map((e, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '12px' }}>{e.degree} in {e.branch}</p>
                    <p style={{ fontSize: '10px', color: '#666' }}>{e.college}</p>
                  </div>
                  <span style={{ fontSize: '10px', color: '#888' }}>{e.startYear}–{e.endYear}</span>
                </div>
              </div>
            ))}
          </CreSection>
        )}
      </div>
    </div>
  );
}

function CreSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color, borderBottom: `1px solid ${color}`, paddingBottom: '5px', marginBottom: '12px' }}>{title}</h3>
      {children}
    </div>
  );
}

// ─── CORPORATE TEMPLATE ──────────────────────────────────────────────────────
function CorporateTemplate({ resume }) {
  const { personalInfo: p = {}, education = [], skills = [], experience = [], projects = [], certifications = [] } = resume;
  const color = '#1d4ed8';

  return (
    <div className="resume-page bg-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', padding: '36px', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ borderLeft: `5px solid ${color}`, paddingLeft: '16px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '-0.5px' }}>{p.fullName || 'Your Name'}</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '6px' }}>
          {[p.email, p.phone, p.address, p.linkedin, p.github].filter(Boolean).map((item, i) => (
            <span key={i} style={{ fontSize: '10px', color: '#555' }}>{item}</span>
          ))}
        </div>
      </div>

      {p.summary && (
        <div style={{ background: '#f8fafc', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', color: '#444', lineHeight: '1.7' }}>{p.summary}</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          {experience.some(e => e.company) && (
            <CorpSection title="Experience" color={color}>
              {experience.filter(e => e.company).map((e, i) => (
                <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontWeight: '700', fontSize: '12px', color: '#1a1a1a' }}>{e.role}</p>
                    <span style={{ fontSize: '9px', color: '#888' }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: '10px', color, fontWeight: '600' }}>{e.company}</p>
                  {e.description && <p style={{ fontSize: '10px', color: '#666', marginTop: '4px', lineHeight: '1.5' }}>{e.description}</p>}
                </div>
              ))}
            </CorpSection>
          )}

          {projects.some(p => p.title) && (
            <CorpSection title="Projects" color={color}>
              {projects.filter(p => p.title).map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <p style={{ fontWeight: '700', fontSize: '12px' }}>{proj.title}</p>
                  {proj.technologies && <p style={{ fontSize: '9px', color }}>{proj.technologies}</p>}
                  {proj.description && <p style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>{proj.description}</p>}
                </div>
              ))}
            </CorpSection>
          )}
        </div>

        <div>
          {education.some(e => e.college) && (
            <CorpSection title="Education" color={color}>
              {education.filter(e => e.college).map((e, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <p style={{ fontWeight: '700', fontSize: '12px' }}>{e.degree} in {e.branch}</p>
                  <p style={{ fontSize: '10px', color: '#666' }}>{e.college}</p>
                  <p style={{ fontSize: '9px', color: '#888' }}>{e.startYear}–{e.endYear} {e.cgpa && `· CGPA: ${e.cgpa}`}</p>
                </div>
              ))}
            </CorpSection>
          )}

          {skills.length > 0 && (
            <CorpSection title="Skills" color={color}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map(s => (
                  <span key={s} style={{ fontSize: '9px', background: color + '15', color, border: `1px solid ${color}30`, padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>{s}</span>
                ))}
              </div>
            </CorpSection>
          )}

          {certifications.some(c => c.name) && (
            <CorpSection title="Certifications" color={color}>
              {certifications.filter(c => c.name).map((c, i) => (
                <p key={i} style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>• {c.name} {c.date && `(${c.date})`}</p>
              ))}
            </CorpSection>
          )}
        </div>
      </div>
    </div>
  );
}

function CorpSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ width: '12px', height: '12px', background: color, borderRadius: '2px' }} />
        <h3 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#333' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
