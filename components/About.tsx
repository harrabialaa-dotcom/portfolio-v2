'use client'
import { useEffect, useRef, useState } from 'react'
const TECH_GROUPS = [
  { cat: 'Infrastructure', emoji: 'Server', items: ['Windows Server 2012-2016','Hyper-V','Active Directory','DNS / DHCP','IIS','SCCM','Altiris','Ubuntu / Linux'] },
  { cat: 'Security', emoji: 'Security', items: ['TISAX','CrowdStrike','Evidian','LENEL OnGuard','SSL/TLS','VPN','Symantec','IT Security Risk Mgmt'] },
  { cat: 'SAP & ERP', emoji: 'SAP', items: ['SAP MM','SAP BW','SAP ERP S/4 HANA','MES','OPC Server'] },
  { cat: 'Cloud & M365', emoji: 'Cloud', items: ['Azure Cloud','Azure Fundamentals','Microsoft 365','SharePoint Online','Google Workspace','Office 365'] },
  { cat: 'Networking', emoji: 'Network', items: ['TCP/IP','VoIP','Wireless','PRTG','GRAFANA','BOMGAR','Network Security'] },
  { cat: 'Dev & Scripting', emoji: 'Dev', items: ['PowerShell','PowerShell Automation','Python','ASP.NET MVC','Task Automation'] },
  { cat: 'Databases', emoji: 'DB', items: ['SQL Server MSSQL','PL/SQL','MySQL','Microsoft Access'] },
  { cat: 'ITSM & Project', emoji: 'ITSM', items: ['JIRA','ITSM','CAPEX / OPEX','Backup & DR','Commvault'] },
  { cat: 'AI & Analytics', emoji: 'AI', items: ['Machine Learning','Predictive Maintenance'] },
]
const STATS = [
  { value: '6+', label: 'Years Experience' },
  { value: '200+', label: 'Endpoints Managed' },
  { value: '40%', label: 'Downtime Reduced' },
  { value: '35%', label: 'Faster Resolution' },
]
const VALUES = [
  { label: 'Reliability', desc: 'Enterprise environments demand near-zero downtime. Every solution built with resilience and redundancy.' },
  { label: 'Security', desc: 'Driving TISAX compliance and cybersecurity standards across industrial and business systems.' },
  { label: 'Systems Thinking', desc: 'Seeing how parts interact from SAP modules to MES layers and optimizing the whole.' },
  { label: 'Leadership', desc: 'Led cross-functional IT teams, mentoring specialists and aligning delivery with business goals.' },
]
const INFO = [
  { text: 'Sousse, Tunisia', sub: 'North Africa' },
  { text: 'Business Applications & Cybersecurity Officer @ Valeo', sub: 'Automotive Industry' },
  { text: 'SAP · MES · Security · Cloud', sub: 'Enterprise IT' },
]
function TechModal({ group, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,12,28,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, background: 'rgba(15,30,60,0.98)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: 4 }}>TECH CATEGORY</div>
            <h3 style={{ fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}>{group.cat}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 14px', fontFamily: 'DM Mono', fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>✕ Close</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {group.items.map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, minWidth: 'fit-content' }}>
                <span style={{ fontFamily: 'DM Mono', fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)' }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontFamily: 'DM Mono', fontSize: '0.78rem', color: '#fff', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}>{group.items.length} technologies</div>
        </div>
      </div>
    </div>
  )
}
export default function About() {
  const sectionRef = useRef(null)
  const [activeGroup, setActiveGroup] = useState(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08 })
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <section id="about" ref={sectionRef} style={{ padding: '80px 24px', maxWidth: 1240, margin: '0 auto' }}>
      <div className="reveal" style={{ marginBottom: 56 }}>
        <div className="section-label">— ABOUT ME</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05 }}>Results-driven, <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>enterprise-focused</em></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, lineHeight: 1.8, fontSize: '0.95rem' }}>IT Specialist with <strong style={{ color: 'var(--text-primary)' }}>6+ years</strong> managing enterprise infrastructures. Expertise in SAP modules, cybersecurity, MES systems and IT strategy execution. Proven ability to enhance system reliability and lead cross-functional teams.</p>
        </div>
      </div>
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
        {STATS.map((s, i) => (
          <div key={s.label} className="card" style={{ padding: '24px 20px', textAlign: 'center', transitionDelay: i * 0.08 + 's' }}>
            <div className="font-display gradient-text" style={{ fontSize: '2.2rem', lineHeight: 1 }}>{s.value}</div>
            <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="two-col-grid reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {VALUES.map(v => (
            <div key={v.label} className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 6, color: 'var(--accent)' }}>{v.label}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.65 }}>{v.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {INFO.map(item => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <div>
                <div className="font-mono" style={{ color: 'var(--text-primary)', fontSize: '0.76rem' }}>{item.text}</div>
                <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.62rem', marginTop: 2 }}>{item.sub}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8 }}>
            <div className="font-mono" style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 12 }}>— TECH STACK · click to explore</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {TECH_GROUPS.map(group => (
                <button key={group.cat} onClick={() => setActiveGroup(group)}
                  style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8, fontFamily: 'DM Mono', fontSize: '0.68rem', color: '#fff', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {group.cat} <span style={{ opacity: 0.4, fontSize: '0.6rem' }}>({group.items.length})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {activeGroup && <TechModal group={activeGroup} onClose={() => setActiveGroup(null)} />}
    </section>
  )
}
