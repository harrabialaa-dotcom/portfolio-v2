'use client'
import { useEffect, useRef, useState } from 'react'

const EVENTS = [
  {
    year: '01/04/2024 – Present',
    title: 'Business Applications Support & Cybersecurity Officer',
    org: 'Valeo · Sousse, Tunisia',
    desc: 'L1/L2 SAP support, MES validation, TISAX compliance and DRP execution across critical systems.',
    type: 'work',
    tags: ['SAP MM/SD', 'MES', 'TISAX', 'OPC Server', 'ITSM', 'Cybersecurity'],
    tasks: [
      'Provide Level 1 & 2 application support for SAP MM/SD modules',
      'Handle and resolve user incidents and service requests via ITSM tools, ensuring SLA compliance',
      'Test and validate MES package upgrades and the interaction of business flows between SAP and other systems',
      'Oversee system performance tuning and optimization across SAP environments',
      'Apply documented support procedures and escalate incidents to Level 3 SAP projects (Comp@as)',
      'Execute Disaster Recovery Plans (DRP) for critical systems, including MES, OPC Server and core infrastructure',
      'Lead the implementation of new ICS standards, achieving 100% compliance with security protocols',
      'Optimize database performance, reducing query response times by 40%',
      'Drive security compliance initiatives (TISAX) across the organization',
      'Optimize IT budget allocation while ensuring high-quality service delivery',
      'Track and report on IT performance KPIs, enabling data-driven decision-making',
    ],
  },
  {
    year: '27/01/2024 – 06/03/2024',
    title: 'Lead IT Specialist',
    org: 'Leoni Wiring System · Monastir, Tunisia',
    desc: 'Led a team of 5 IT specialists, overseeing infrastructure, security, DRP and cross-functional IT operations.',
    type: 'work',
    tags: ['Team Leadership', 'IT Infrastructure', 'Security', 'DR Planning', 'Compliance'],
    tasks: [
      'Led and mentored a team of 5 IT specialists, improving productivity, collaboration, and service delivery',
      'Planned, coordinated and executed system upgrades and migrations',
      'Oversaw day-to-day IT operations, ensuring high system availability, network performance and business continuity',
      'Designed and implemented scalable, robust IT infrastructure solutions aligned with organizational goals',
      'Established and enforced comprehensive security protocols and compliance frameworks, reducing risk',
      'Optimized database and system performance, applying security measures and ensuring data integrity',
      'Developed, maintained, and tested disaster recovery and business continuity plans',
      'Implemented and managed backup and recovery procedures, ensuring rapid restoration of critical data',
      'Monitored system performance and logs, proactively identifying and resolving issues before impact',
      'Generated detailed reports on IT performance, incidents and resolutions for management review',
      'Collaborated with cross-functional teams to troubleshoot complex technical issues and streamline IT processes',
    ],
  },
  {
    year: '21/09/2020 – 26/01/2024',
    title: 'IT Specialist',
    org: 'Leoni Wiring System · Monastir, Tunisia',
    desc: 'Managed 200+ endpoints, enterprise-wide server/network infrastructure, Active Directory and security posture.',
    type: 'work',
    tags: ['Windows Server', 'Active Directory', 'Networking', 'PowerShell', 'Endpoint Management'],
    tasks: [
      'Managed enterprise-wide server and network infrastructure, ensuring stability, scalability and high availability',
      'Delivered technical support and troubleshooting, achieving near-zero downtime for end-users',
      'Reduced system downtime by 40% through proactive monitoring and preventive maintenance',
      'Analyzed system logs and alerts to proactively detect and mitigate potential issues',
      'Implemented an automated identity management system, improving compliance and operational efficiency',
      'Conducted regular security audits and risk assessments, strengthening overall IT security posture',
      'Managed 200+ endpoints, including desktops, laptops, and mobile devices, ensuring seamless operations',
      'Reduced ticket resolution time by 35%, enhancing end-user satisfaction and support efficiency',
      'Implemented and maintained automated backup solutions, ensuring restoration of critical data',
      'Managed and optimized Active Directory infrastructure, improving system performance and operational efficiency',
      'Coordinated software deployments and patch management, ensuring system security, compliance and smooth rollouts',
    ],
  },
  {
    year: '2016 – 2020',
    title: "Bachelor's in Computer Science, Networks & Computer Services",
    org: 'ISET Sousse · University of Sousse, Tunisia',
    desc: "Bachelor's degree in Computer Science, Networks and Computer Services — Higher Institute of Technological Studies of Sousse.",
    type: 'education',
    tags: ['Computer Science', 'Networking', 'Computer Services'],
    tasks: [],
  },
  {
    year: "2022 — 2024",
    title: "2022 — 2024 Degree — Cloud Computing",
    org: 'ISET Sousse · Tunisia',
    desc: 'Advanced studies in Cloud Computing architecture, virtualization and distributed systems.',
    type: 'education',
    tags: ['Cloud Computing', 'Virtualization', 'Distributed Systems'],
    tasks: [],
  },
]

const CERTIFICATIONS = [
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS) Certified',
    subtitle: '4 Certifications · Udemy',
    date: 'Feb 5, 2024',
    issuer: 'Udemy / BackSpace Academy',
    color: '#f59e0b',
    icon: '☁️',
    img: '/screenshots/cert-aws.png',
  },
  {
    id: 'itil',
    name: 'ITIL 4 Exam Preparation',
    subtitle: 'Course Certificate · Coursera',
    date: 'Jan 17, 2024',
    issuer: 'LearnQuest / Coursera',
    color: '#60a5fa',
    icon: '📘',
    img: '/screenshots/cert-itil.png',
  },
  {
    id: 'm365',
    name: 'Microsoft 365 Fundamentals',
    subtitle: 'Microsoft Certified',
    date: 'Apr 17, 2023',
    issuer: 'Microsoft',
    color: '#00a4ef',
    icon: '🪟',
    img: '/screenshots/cert-m365.png',
  },
  {
    id: 'azure-ai',
    name: 'Azure AI Fundamentals',
    subtitle: 'Microsoft Certified',
    date: 'Apr 25, 2023',
    issuer: 'Microsoft',
    color: '#00a4ef',
    icon: '🤖',
    img: '/screenshots/cert-azure-ai.png',
  },
  {
    id: 'azure',
    name: 'Azure Fundamentals',
    subtitle: 'Microsoft Certified',
    date: 'Apr 24, 2023',
    issuer: 'Microsoft',
    color: '#00a4ef',
    icon: '☁️',
    img: '/screenshots/cert-azure.png',
  },
  {
    id: 'azure-data',
    name: 'Azure Data Fundamentals',
    subtitle: 'Microsoft Certified',
    date: 'Apr 26, 2023',
    issuer: 'Microsoft',
    color: '#00a4ef',
    icon: '🗄️',
    img: '/screenshots/cert-azure-data.png',
  },
  {
    id: 'power',
    name: 'Power Platform Fundamentals',
    subtitle: 'Microsoft Certified',
    date: 'Jun 16, 2023',
    issuer: 'Microsoft',
    color: '#742774',
    icon: '⚡',
    img: '/screenshots/cert-power.png',
  },
  {
    id: 'sql',
    name: 'SQL Server Administration',
    subtitle: 'Attestation de Formation · VertiLearn',
    date: 'Jan 20, 2023',
    issuer: 'VertiLearn / LEONI',
    color: '#34d399',
    icon: '🗃️',
    img: '/screenshots/cert-sql.png',
  },
]

const TYPE_COLORS: Record<string, string> = {
  work: 'var(--accent)',
  education: 'var(--teal)',
  cert: 'var(--purple)',
}

function TasksModal({ event, onClose }: { event: typeof EVENTS[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  const color = TYPE_COLORS[event.type] ?? 'var(--accent)'
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,12,28,0.88)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 680, background: 'rgba(15,30,60,0.98)', border: `1px solid ${color}40`, borderRadius: 16, boxShadow: `0 32px 80px rgba(0,0,0,0.6)`, overflow: 'hidden', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexShrink: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}` }} />
              <span style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>{event.year}</span>
              <span style={{ padding: '2px 8px', borderRadius: 4, fontFamily: 'DM Mono', fontSize: '0.58rem', color, background: `${color}15`, border: `1px solid ${color}35` }}>{event.type}</span>
            </div>
            <h3 style={{ fontWeight: 600, fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>{event.title}</h3>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.68rem', color: 'rgba(255,255,255,0.42)' }}>{event.org}</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '6px 14px', fontFamily: 'DM Mono', fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', flexShrink: 0 }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.18)'; e.currentTarget.style.color = '#ff8080' }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}>
            ✕ Close
          </button>
        </div>
        <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color, letterSpacing: '0.15em', marginBottom: 14 }}>KEY RESPONSIBILITIES — {event.tasks.length} tasks</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {event.tasks.map((task, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = `${color}0d` }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}>
                <span style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color, flexShrink: 0, marginTop: 2, opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.6 }}>✓ {task}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
            {event.tags.map(t => (
              <span key={t} style={{ padding: '4px 10px', background: `${color}12`, color, border: `1px solid ${color}30`, borderRadius: 6, fontFamily: 'DM Mono', fontSize: '0.62rem' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CertModal({ cert, onClose }: { cert: typeof CERTIFICATIONS[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,12,28,0.92)', backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 820, background: 'rgba(10,20,45,0.99)', border: `1px solid ${cert.color}40`, borderRadius: 16, boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${cert.color}18`, overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: cert.color, boxShadow: `0 0 10px ${cert.color}` }} />
            <span style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>CERTIFICATION</span>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{cert.name}</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '6px 16px', fontFamily: 'DM Mono', fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.18)'; e.currentTarget.style.color = '#ff8080' }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}>
            ✕ Close
          </button>
        </div>
        {/* Certificate image */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
          <img src={cert.img} alt={cert.name} style={{ maxWidth: '100%', maxHeight: '65vh', borderRadius: 10, border: `1px solid ${cert.color}30`, boxShadow: `0 16px 48px rgba(0,0,0,0.5)`, objectFit: 'contain' }} />
        </div>
        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.68rem', color: '#fff', fontWeight: 500 }}>{cert.issuer}</div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Issued: {cert.date}</div>
          </div>
          <span style={{ padding: '4px 12px', background: `${cert.color}18`, border: `1px solid ${cert.color}40`, borderRadius: 6, fontFamily: 'DM Mono', fontSize: '0.62rem', color: cert.color }}>{cert.subtitle}</span>
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeModal, setActiveModal] = useState<number | null>(null)
  const [activeCert, setActiveCert] = useState<typeof CERTIFICATIONS[0] | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="timeline" ref={sectionRef} style={{ padding: '80px 24px', maxWidth: 1240, margin: '0 auto' }}>
      <div className="reveal" style={{ marginBottom: 64 }}>
        <div className="section-label">— JOURNEY</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05 }}>
          Career &amp; <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>education</em>
        </h2>
      </div>

      {/* Two-column layout: Timeline left, Certifications right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>

        {/* LEFT — Timeline */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 4, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--accent), var(--border), transparent)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {EVENTS.map((ev, i) => {
              const color = TYPE_COLORS[ev.type] ?? 'var(--accent)'
              const hasTasks = ev.tasks.length > 0
              return (
                <div key={i} className="reveal" style={{ display: 'flex', gap: 32, paddingBottom: 40, transitionDelay: `${i * 0.1}s` }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4, flexShrink: 0 }}>
                    <div className="timeline-dot" style={{ borderColor: color, boxShadow: `0 0 12px ${color}44` }} />
                  </div>
                  <div className="card" style={{ padding: '20px 22px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                      <span className="font-mono" style={{ fontSize: '0.68rem', color, letterSpacing: '0.08em' }}>{ev.year}</span>
                      <span className="tag" style={{ fontSize: '0.62rem', borderColor: `${color}40`, color, background: `${color}10` }}>{ev.type}</span>
                    </div>
                    <h3 style={{ fontWeight: 500, fontSize: '0.98rem', marginBottom: 3 }}>{ev.title}</h3>
                    <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 10 }}>{ev.org}</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: 12 }}>{ev.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: hasTasks ? 14 : 0 }}>
                      {ev.tags.map(t => <span key={t} className="tag" style={{ fontSize: '0.6rem' }}>{t}</span>)}
                    </div>
                    {hasTasks && (
                      <button onClick={() => setActiveModal(i)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', background: `${color}12`, border: `1px solid ${color}40`, borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.68rem', color, letterSpacing: '0.05em', transition: 'all 0.2s' }}
                        onMouseOver={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.transform = 'translateY(-1px)' }}
                        onMouseOut={e => { e.currentTarget.style.background = `${color}12`; e.currentTarget.style.transform = 'translateY(0)' }}>
                        <span style={{ fontSize: '0.8rem' }}>📋</span>
                        View {ev.tasks.length} Tasks →
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — Certifications */}
        <div className="reveal" style={{ position: 'sticky', top: 100 }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.22em', marginBottom: 20 }}>— CERTIFICATIONS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CERTIFICATIONS.map((cert, i) => (
              <div key={cert.id} className="card reveal" style={{ padding: '14px 16px', transitionDelay: `${i * 0.07}s`, cursor: 'pointer' }}
                onClick={() => setActiveCert(cert)}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}60`; (e.currentTarget as HTMLElement).style.background = `${cert.color}08` }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.background = '' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: cert.color, flexShrink: 0, boxShadow: `0 0 8px ${cert.color}80` }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 500, color: '#fff', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cert.name}</div>
                      <div style={{ fontFamily: 'DM Mono', fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{cert.date} · {cert.issuer}</div>
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveCert(cert) }}
                    style={{ flexShrink: 0, padding: '5px 10px', background: `${cert.color}15`, border: `1px solid ${cert.color}45`, borderRadius: 6, fontFamily: 'DM Mono', fontSize: '0.6rem', color: cert.color, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = `${cert.color}30` }}
                    onMouseOut={e => { e.currentTarget.style.background = `${cert.color}15` }}>
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontFamily: 'DM Mono', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
            {CERTIFICATIONS.length} certifications · click to view
          </div>
        </div>
      </div>

      {activeModal !== null && (
        <TasksModal event={EVENTS[activeModal]} onClose={() => setActiveModal(null)} />
      )}
      {activeCert !== null && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </section>
  )
}
