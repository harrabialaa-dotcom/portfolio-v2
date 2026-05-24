'use client'
import { useState } from 'react'

const SOCIALS = [
  { icon: 'LI', label: 'LinkedIn', handle: 'linkedin.com/in/alaa-harrabi-220123183', href: 'https://www.linkedin.com/in/alaa-harrabi-220123183/' },
  { icon: 'GH', label: 'GitHub', handle: 'github.com/harrabialaa-dotcom', href: 'https://github.com/harrabialaa-dotcom' },
  { icon: '@', label: 'Email', handle: 'harrabialaa@gmail.com', href: 'mailto:harrabialaa@gmail.com' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    try {
      const res = await fetch('https://formspree.io/f/xjgzveqq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (res.ok) setSent(true)
    } catch {}
    setSending(false)
  }

  return (
    <section id="contact" style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.08)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid' }} className="two-col-grid">
        {/* Left */}
        <div>
          <div className="section-label">— CONTACT</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05, marginBottom: 20 }}>
            Let&apos;s build
            <br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>something great</em>
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 44, fontSize: '1rem', maxWidth: 420 }}>
            Whether you have an industrial automation challenge, a web project, or just want to connect — I&apos;m always open to interesting conversations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', cursor: 'none' }}>
                <span className="font-mono" style={{ color: 'var(--accent)', fontSize: '1rem', minWidth: 20 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 2 }}>{s.label}</div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.handle}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.75rem' }}>&rarr;</span>
              </a>
            ))}
          </div>

          {/* Location card */}
          <div className="card-accent" style={{ padding: '18px 20px', marginTop: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📍</div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 400 }}>Based in Sousse, Tunisia</div>
              <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Open to remote &amp; hybrid opportunities</div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {sent ? (
            <div className="card-accent" style={{ padding: 40, textAlign: 'center', borderRadius: 16 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✉</div>
              <h3 className="font-display" style={{ fontSize: '1.8rem', marginBottom: 12, color: 'var(--accent)' }}>Message sent!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thank you for reaching out. I&apos;ll get back to you soon.</p>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                className="btn-outline" style={{ marginTop: 24 }}>Send another</button>
            </div>
          ) : (
            <div className="card" style={{ padding: 36 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {(['name', 'email'] as const).map(field => (
                  <div key={field}>
                    <label className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', display: 'block', marginBottom: 8 }}>
                      {field.toUpperCase()}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={form[field]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      placeholder={field === 'name' ? 'Your full name' : 'your@email.com'}
                      style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontFamily: 'Outfit', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', display: 'block', marginBottom: 8 }}>MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontFamily: 'Outfit', fontSize: '0.9rem', outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <button onClick={handleSubmit} disabled={sending} className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Sending...' : 'Send message \u2192'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
