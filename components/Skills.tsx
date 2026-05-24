'use client'
import { useEffect, useRef } from 'react'

const GROUPS = [
  {
    title: 'Industrial & Automation',
    color: 'var(--accent)',
    skills: [
      { name: 'PLC Programming', tier: 'Proficient' },
      { name: 'SCADA Systems', tier: 'Proficient' },
      { name: 'OPC-UA / Industrial Protocols', tier: 'Proficient' },
      { name: 'SAP ERP / S4HANA', tier: 'Expert' },
      { name: 'MES (DELMIA Apriso)', tier: 'Expert' },
      { name: 'TISAX / ICS Cybersecurity', tier: 'Proficient' },
    ],
  },
  {
    title: 'Development',
    color: 'var(--teal)',
    skills: [
      { name: 'Python', tier: 'Expert' },
      { name: 'SQL / Databases', tier: 'Expert' },
      { name: 'React / Next.js', tier: 'Proficient' },
      { name: 'C# / .NET', tier: 'Familiar' },
      { name: 'Node.js', tier: 'Familiar' },
      { name: 'n8n Automation', tier: 'Proficient' },
    ],
  },
  {
    title: 'Tools & Infrastructure',
    color: 'var(--purple)',
    skills: [
      { name: 'Azure / Azure AD', tier: 'Proficient' },
      { name: 'Power BI / Grafana', tier: 'Expert' },
      { name: 'Docker', tier: 'Familiar' },
      { name: 'Linux Administration', tier: 'Proficient' },
      { name: 'Commvault Backup', tier: 'Expert' },
      { name: 'Git & CI/CD', tier: 'Proficient' },
    ],
  },
]

const TIER_COLORS: Record<string, string> = {
  Expert: 'rgba(201,169,110,0.15)',
  Proficient: 'rgba(94,207,186,0.1)',
  Familiar: 'rgba(255,255,255,0.06)',
}

const TIER_BORDER: Record<string, string> = {
  Expert: 'rgba(201,169,110,0.5)',
  Proficient: 'rgba(94,207,186,0.35)',
  Familiar: 'rgba(255,255,255,0.15)',
}

const TIER_TEXT: Record<string, string> = {
  Expert: '#c9a96e',
  Proficient: '#5ecfba',
  Familiar: 'rgba(255,255,255,0.4)',
}

const TOOLS = ['VS Code', 'PyCharm', 'SQL Server', 'PostgreSQL', 'InfluxDB', 'Grafana', 'Postman', 'Jira', 'Confluence', 'TIA Portal', 'WinCC', 'Azure DevOps']

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
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>— SKILLS</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05 }}>
            Capabilities &amp; <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>expertise</em>
          </h2>

          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
            {['Expert', 'Proficient', 'Familiar'].map(tier => (
              <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: TIER_COLORS[tier], border: `1px solid ${TIER_BORDER[tier]}` }} />
                <span className="font-mono" style={{ fontSize: '0.65rem', color: TIER_TEXT[tier], letterSpacing: '0.1em' }}>{tier.toUpperCase()}</span>
              </div>
            ))}
          </div>
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
                  <div key={skill.name} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 8,
                    background: TIER_COLORS[skill.tier],
                    border: `1px solid ${TIER_BORDER[skill.tier]}`,
                  }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{skill.name}</span>
                    <span className="font-mono" style={{ fontSize: '0.6rem', color: TIER_TEXT[skill.tier], letterSpacing: '0.08em', fontWeight: 600 }}>
                      {skill.tier.toUpperCase()}
                    </span>
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
