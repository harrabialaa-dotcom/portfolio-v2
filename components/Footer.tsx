export default function Footer() {
  return (
    <footer style={{ padding: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
        © 2026 Alaa Harrabi
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {[
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alaa-harrabi-220123183/' },
          { label: 'GitHub', href: 'https://github.com/harrabialaa-dotcom' },
          { label: 'Email', href: 'mailto:harrabialaa@gmail.com' },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className="font-mono nav-link" style={{ fontSize: '0.68rem' }}>
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
