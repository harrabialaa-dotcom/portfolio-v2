'use client'
import { useEffect, useRef, useState } from 'react'

const ROLES = ['IT & Automation Specialist', 'Cybersecurity Officer', 'Business Apps Support', 'Infrastructure Lead']

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const target = ROLES[roleIdx]
    let i = 0
    let timeout: NodeJS.Timeout
    if (typing) {
      const type = () => {
        if (i <= target.length) { setDisplayed(target.slice(0, i)); i++; timeout = setTimeout(type, 65) }
        else { timeout = setTimeout(() => setTyping(false), 2000) }
      }
      type()
    } else {
      let j = target.length
      const erase = () => {
        if (j >= 0) { setDisplayed(target.slice(0, j)); j--; timeout = setTimeout(erase, 32) }
        else { setRoleIdx(p => (p + 1) % ROLES.length); setTyping(true) }
      }
      erase()
    }
    return () => clearTimeout(timeout)
  }, [roleIdx, typing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.3, opacity: Math.random() * 0.35 + 0.08 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${p.opacity})`; ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201,169,110,${0.04 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }} className="grid-bg">
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />
      
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 60% 70% at 30% 50%, rgba(201,169,110,0.04) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 40% 40% at 75% 60%, rgba(94,207,186,0.03) 0%, transparent 60%)' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto', padding: '0 24px', width: '100%', paddingTop: 110 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          {/* LEFT: main content */}
          <div style={{ maxWidth: 720 }}>

            {/* Status badge */}
            <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.18)', borderRadius: 999, padding: '6px 16px', marginBottom: 44 }}>
              <span className="status-dot" />
              <span className="font-mono" style={{ fontSize: '0.68rem', color: '#4ade80', letterSpacing: '0.12em' }}>AVAILABLE · SOUSSE, TUNISIA</span>
            </div>

            <p className="font-mono animate-fade-up delay-100" style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 14, opacity: 0 }}>
              hello — I am
            </p>

            <h1 className="font-display animate-fade-up delay-200" style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', lineHeight: 0.9, marginBottom: 24, opacity: 0 }}>
              Alaa
              <br />
              <span style={{ color: 'var(--accent)' }}>Harrabi</span>
            </h1>

            {/* Avatar photo */}
            <div className="animate-fade-up delay-300" style={{ marginBottom: 24, opacity: 0 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{
                  position: 'absolute', inset: -3, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), rgba(126,236,216,0.6), var(--accent))',
                  animation: 'spin-slow 6s linear infinite', zIndex: 0,
                }} />
                <div style={{ position: 'absolute', inset: -1, borderRadius: '50%', background: 'var(--bg)', zIndex: 1 }} />
                <div style={{
                  position: 'relative', zIndex: 2,
                  width: 110, height: 110, borderRadius: '50%', overflow: 'hidden',
                  border: '3px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,213,128,0.2)',
                  filter: 'brightness(1.08) contrast(1.05) saturate(1.1)',
                }}>
                  <img src="/avatar.png" alt="Alaa Harrabi" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                </div>
                <div style={{
                  position: 'absolute', bottom: 6, right: 6, zIndex: 3,
                  width: 14, height: 14, borderRadius: '50%',
                  background: '#4ade80', border: '2px solid var(--bg)',
                  boxShadow: '0 0 8px rgba(74,222,128,0.8)',
                }} />
              </div>
            </div>

            {/* Typewriter */}
            <div className="animate-fade-up delay-400" style={{ display: 'flex', alignItems: 'center', marginBottom: 28, opacity: 0, minHeight: 44 }}>
              <span className="font-mono" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'var(--text-secondary)' }}>{displayed}</span>
              <span className="animate-blink font-mono" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'var(--accent)', marginLeft: 3 }}>|</span>
            </div>

            {/* Company badge */}
            <div className="animate-fade-up delay-500" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--surface)', border: '1px solid var(--border-gold)', borderRadius: 8, padding: '8px 16px', marginBottom: 32, opacity: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--accent)' }} />
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>@ Valeo — Business Apps & Cybersecurity</span>
            </div>

            <p className="animate-fade-up delay-600" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 540, marginBottom: 44, opacity: 0 }}>
              IT & Industrial Automation Specialist with <strong style={{ color: 'var(--accent)' }}>6+ years of experience</strong> bridging shopfloor OT and enterprise IT in automotive manufacturing.
              Expertise in SAP, MES systems, OPC UA, cybersecurity and AI-powered industrial solutions.
            </p>

            <div className="animate-fade-up delay-700" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', opacity: 0 }}>
              <a href="#projects" className="btn-primary">View my work</a>
              <a href="#contact" className="btn-outline">Let&apos;s connect &rarr;</a>
            </div>

            <div className="animate-fade-up delay-700" style={{ marginTop: 72, display: 'flex', alignItems: 'center', gap: 14, opacity: 0 }}>
              <div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, transparent, var(--border-bright))' }} />
              <span className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.14em' }}>SCROLL TO EXPLORE</span>
            </div>
          </div>

          {/* RIGHT: stat cards */}
          <div className="stat-cards" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignSelf: 'center' }}>
            {[
              { value: '6+', label: 'Years Exp.', icon: '\u25c8' },
              { value: '8+', label: 'Projects', icon: '\u25c9' },
              { value: 'Valeo', label: 'Current Role', icon: '\u25c7' },
            ].map((stat, i) => (
              <div key={stat.label} className="animate-float card" style={{ padding: '22px 26px', textAlign: 'center', animationDelay: `${i * 0.8}s`, minWidth: 110 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent)', marginBottom: 6 }}>{stat.icon}</div>
                <div className="font-display gradient-text" style={{ fontSize: stat.value.length > 4 ? '1.4rem' : '2.2rem', lineHeight: 1 }}>{stat.value}</div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 5, letterSpacing: '0.1em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glow-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  )
}
