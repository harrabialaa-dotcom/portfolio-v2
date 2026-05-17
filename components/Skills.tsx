'use client'
import { useEffect, useRef } from 'react'

const GROUPS = [
  {
    title: 'Industrial & Automation',
    color: 'var(--accent)',
    skills: [
      { name: 'PLC Programming', level: 80 },
      { name: 'SCADA Systems', level: 75 },
      { name: 'OPC-UA / Industrial Protocols', level: 72 },
      { name: 'SAP ERP Integration', level: 70 },
      { name: 'Power Automate', level: 78 },
    ],
  },
  {
    title: 'Development',
    color: 'var(--teal)',
    skills: [
      { name: 'Python', level: 88 },
      { name: 'SQL / Databases', level: 85 },
      { name: 'React / Next.js', level: 78 },
      { name: 'C# / .NET', level: 72 },
      { name: 'Node.js', level: 70 },
    ],
  },
  {
    title: 'Tools & Infrastructure',
    color: 'var(--purple)',
    skills: [
      { name: 'Azure / Azure AD', level: 75 },
      { name: 'Power BI', level: 82 },
      { name: 'Docker', level: 68 },
      { name: 'Linux Administration', level: 74 },
      { name: 'Git & CI/CD', level: 76 },
    ],
  },
]

const TOOLS = ['VS Code', 'PyCharm', 'SQL Server', 'PostgreSQL', 'InfluxDB', 'Grafana', 'Postman', 'Jira', 'Confluence', 'TIA Portal', 'WinCC', 'Azure DevOps']

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          e.target.querySelectorAll('.skill-bar-fill').forEach((el, i) => {
            setTimeout(() => el.classList.add('active'), i * 80)
          })
        }
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
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
          {GROUPS.map((group, gi) => (
            <div key={group.title} className="reveal card" style={{ padding: '28px', transitionDelay: `${gi * 0.1}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                <div style={{ width: 3, height: 20, background: group.color, borderRadius: 2 }} />
                <h3 style={{ fontWeight: 500, fontSize: '0.92rem' }}>{group.title}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {group.skills.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{skill.name}</span>
                      <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${group.color}, ${group.color}99)` }} />
                    </div>
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
