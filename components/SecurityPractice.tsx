'use client'
import { useEffect, useRef } from 'react'

const EXAMPLES = [
  {
    title: 'ICS security compliance',
    source: 'CURRENT ROLE',
    detail: 'Implemented new ICS standards across industrial systems.',
    outcome: 'Achieved 100% compliance with security protocols.',
    color: 'var(--accent)',
  },
  {
    title: 'Industrial network architecture',
    source: 'AI VISUAL INSPECTION PROJECT',
    detail: 'Connected AI vision systems with PLC-controlled production equipment using REST API and Modbus TCP.',
    outcome: 'Project includes VLAN network architecture with EasyNAC and cybersecurity compliance.',
    color: 'var(--teal)',
  },
  {
    title: 'Operational resilience',
    source: 'CURRENT ROLE',
    detail: 'Executed disaster recovery plans for MES, OPC Server, and core infrastructure.',
    outcome: 'Recovery planning applied to critical business and industrial systems.',
    color: 'var(--purple)',
  },
]

const APPROACH = [
  { title: 'Understand context', detail: 'Map business processes, critical services, and operational dependencies.' },
  { title: 'Assess risk', detail: 'Review security, availability, and compliance needs across IT and OT environments.' },
  { title: 'Align safeguards', detail: 'Balance security controls with business and production requirements.' },
  { title: 'Support resilience', detail: 'Keep ownership, compliance evidence, and recovery readiness in view.' },
]

export default function SecurityPractice() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    sectionRef.current?.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="security-practice"
      ref={sectionRef}
      style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.08)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>— SECURITY IN PRACTICE</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05 }}>
            Architecture shaped by <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>real operations</em>
          </h2>
          <p style={{ maxWidth: 700, margin: '18px auto 0', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            A practical approach that connects security risk, business priorities, industrial operations, and resilience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14, marginBottom: 48 }}>
          {APPROACH.map((step, index) => (
            <div key={step.title} className="reveal card" style={{ padding: 22, transitionDelay: `${index * 0.08}s` }}>
              <div className="font-mono" style={{ color: 'var(--accent)', fontSize: '0.65rem', letterSpacing: '0.15em', marginBottom: 14 }}>
                0{index + 1}
              </div>
              <h3 style={{ fontWeight: 500, fontSize: '0.95rem', marginBottom: 8 }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.7 }}>{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginBottom: 20 }}>
          <div className="section-label">— SELECTED EXPERIENCE</div>
          <h3 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
            Security and resilience <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>at work</em>
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {EXAMPLES.map((example, index) => (
            <article key={example.title} className="reveal card" style={{ padding: 24, transitionDelay: `${index * 0.08}s` }}>
              <div className="font-mono" style={{ color: example.color, fontSize: '0.6rem', letterSpacing: '0.14em', marginBottom: 14 }}>
                {example.source}
              </div>
              <h4 style={{ fontWeight: 500, fontSize: '1rem', marginBottom: 12 }}>{example.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: 14 }}>{example.detail}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', lineHeight: 1.7, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                {example.outcome}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
