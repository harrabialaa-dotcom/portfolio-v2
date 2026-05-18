'use client'
import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#timeline', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumePopup, setResumePopup] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = LINKS.map(l => l.href.slice(1))
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s)
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(s); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '14px 24px' : '22px 24px',
        background: scrolled ? 'rgba(20,70,150,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1rem', fontWeight: 600, color: '#05050a', lineHeight: 1 }}>A</span>
          </div>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>HARRABI</span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className={`nav-link ${active === l.href.slice(1) ? 'active' : ''}`}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a href="#" onClick={(e) => { e.preventDefault(); setResumePopup(true) }} className="btn-outline desktop-nav" style={{ padding: '8px 18px', fontSize: '0.7rem' }}>
          Resume ↗
        </a>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: 20, height: 2, background: menuOpen ? 'var(--accent)' : 'rgba(255,255,255,0.7)', transition: 'all 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 20, height: 2, background: menuOpen ? 'transparent' : 'rgba(255,255,255,0.7)', transition: 'all 0.3s' }} />
          <span style={{ display: 'block', width: 20, height: 2, background: menuOpen ? 'var(--accent)' : 'rgba(255,255,255,0.7)', transition: 'all 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </header>

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99,
        background: 'rgba(20,70,150,0.97)', backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        padding: '80px 32px 40px',
      }}>
        {LINKS.map((l, i) => (
          <a
            key={l.href} href={l.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'Cormorant Garamond', fontSize: '2.4rem', color: active === l.href.slice(1) ? 'var(--accent)' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none', letterSpacing: '0.05em', padding: '10px 0',
              transition: 'color 0.2s', display: 'block', textAlign: 'center',
              animation: menuOpen ? `fadeUp 0.4s ${i * 0.06}s both` : 'none',
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#" onClick={(e) => { e.preventDefault(); setResumePopup(true); setMenuOpen(false) }}
          className="btn-primary"
          style={{ marginTop: 24, animation: menuOpen ? 'fadeUp 0.4s 0.4s both' : 'none' }}
        >
          Resume ↗
        </a>
      </div>

      {/* Resume Popup */}
      {resumePopup && (
        <div
          onClick={() => setResumePopup(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(5,12,28,0.85)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(15,30,60,0.98)',
              border: '1px solid rgba(255,213,128,0.3)',
              borderRadius: 16, padding: '40px 36px',
              maxWidth: 420, width: '100%', textAlign: 'center',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>📬</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.6rem', color: '#fff', marginBottom: 12 }}>
              Let's Connect
            </h3>
            <p style={{ fontFamily: 'DM Mono', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 28 }}>
              Please contact me — it will be better to discuss more &amp; get a detailed CV.
            </p>
            <a
              href="#contact"
              onClick={() => setResumePopup(false)}
              style={{
                display: 'inline-block', padding: '12px 28px',
                background: 'linear-gradient(135deg, #ffd580, #ffb830)',
                borderRadius: 8, fontFamily: 'DM Mono', fontSize: '0.75rem',
                color: '#05050a', fontWeight: 700, textDecoration: 'none',
                letterSpacing: '0.05em', cursor: 'pointer',
              }}
            >
              Contact Me ↗
            </a>
            <button
              onClick={() => setResumePopup(false)}
              style={{
                display: 'block', margin: '16px auto 0',
                background: 'none', border: 'none',
                fontFamily: 'DM Mono', fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.3)', cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

