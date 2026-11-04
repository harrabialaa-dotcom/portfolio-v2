'use client'
import { useEffect, useRef } from 'react'

const GROUPS = [
  {
    title: 'Security Architecture & Risk',
    color: 'var(--accent)',
    skills: [
      'Information Security Architecture',
      'Security Risk Assessment',
      'OT/IT Security Architecture',
      'Cloud Security Assessment',
      'Azure Security Fundamentals',
    ],
  },
  {
    title: 'Governance & Assurance',
    color: 'var(--teal)',
    skills: [
      'Cybersecurity Governance',
      'Vulnerability Management',
      'Security Compliance & Policies',
      'Third-Party Security Reviews',
      'Business Continuity & Resilience',
    ],
  },
  {
    title: 'Secure Delivery & Platforms',
    color: 'var(--purple)',
    skills: [
      'Application Security Reviews',
      'Secure SDLC',
      'Microsoft Security Solutions',
      'Power Platform Security Governance',
    ],
  },
]

const TOOLS = ['Varonis', 'Rapid7 InsightVM', 'XM Cyber', 'JIRA', 'CONFLUENCE', 'Orbus Infinity', 'VS Code', 'PyCharm', 'SQL Server', 'PostgreSQL', 'InfluxDB', 'Grafana', 'Postman', 'TIA Portal', 'WinCC', 'Azure DevOps']

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.15 })
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.08)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>— KEY COMPETENCIES</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05 }}>
            Security capabilities &amp; <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>expertise</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
          {GROUPS.map((group, gi) => (
            <div key={group.title} className="reveal card" style={{ padding: '28px', transitionDelay: `${gi * 0.1}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 3, height: 20, background: group.color, borderRadius: 2 }} />
                <h3 style={{ fontWeight: 500, fontSize: '0.92rem' }}>{group.title}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.skills.map(skill => (
                  <div key={skill} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="reveal card" style={{ padding: '24px 28px' }}>
          <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 16 }}>TOOLS & PLATFORMS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TOOLS.map(tool => <span key={tool} className="tag">{tool}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
