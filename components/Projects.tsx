'use client'
import { useState, useEffect, useRef } from 'react'

/* ── Badge Correction System screenshots ── */
const BADGE_SCREENS = [
  { src: '/screenshots/13.png', label: 'Employee Form',       desc: 'Valeo-branded submission portal — Formulaire de correction de badgeage' },
  { src: '/screenshots/8.png',  label: 'n8n Workflow',        desc: 'Full n8n automation pipeline — all nodes visible' },
  { src: '/screenshots/10.png', label: 'Approval Email',      desc: 'Manager approval email — Niveau 4 Directeur RH' },
  { src: '/screenshots/9.png',  label: 'Final Confirmation',  desc: 'Demande DÉFINITIVEMENT APPROUVÉE — all 4 levels signed off' },
  { src: '/screenshots/2.png',  label: 'Process Flow',        desc: '5-step submission process: Employee → Webhook → Validation → DB → Email' },
  { src: '/screenshots/3.png',  label: 'Multi-Level Chain',   desc: 'N+1 Chef Direct → N+2 Resp. Service → N+3 Directeur Site → N+4 DRH' },
  { src: '/screenshots/5.png',  label: 'Decision Tree',       desc: 'Approval logic diagram — 4 validation checks before chain entry' },
  { src: '/screenshots/6.png',  label: 'System Architecture', desc: 'Data flow: Web Form / Mobile App / HRM → n8n → Supabase + Gmail SMTP' },
  { src: '/screenshots/12.png', label: 'DB Schema',           desc: 'Supabase tables: demandes + validations — full field list' },
]

/* ── Active Directory Home Lab screenshots ── */
const AD_SCREENS = [
  { src: '/screenshots/ad-1.png',  label: 'VM Setup',          desc: 'Create Virtual Machine, Install & Configure Windows Server 2019' },
  { src: '/screenshots/ad-2.png',  label: 'Control Panel GPO', desc: 'GPO: Prohibit access to Control Panel — prevent regular user access' },
  { src: '/screenshots/ad-3.png',  label: 'GPO Exclusion',     desc: 'Exclude specific users from applying Group Policy via Security Filtering' },
  { src: '/screenshots/ad-4.png',  label: 'USB Restriction',   desc: 'WPD Devices: Deny read access — block removable storage via GPO' },
  { src: '/screenshots/ad-5.png',  label: 'Drive Mapping',     desc: 'Drive Maps GPO — auto-map \\PDC\\Public network drive for all users' },
  { src: '/screenshots/ad-6.png',  label: 'Disk Quota',        desc: 'Apply Disk Quota 2 GB — warning at 1 GB, deny space when exceeded' },
  { src: '/screenshots/ad-7.png',  label: 'FSRM Install',      desc: 'Install File Server Resource Manager — block executables & media files' },
  { src: '/screenshots/ad-8.png',  label: 'Print Services',    desc: 'Install Print and Document Services role on Windows Server' },
  { src: '/screenshots/ad-9.png',  label: 'Printer Policy',    desc: 'Restrict HR Printer to B&W only, available 8:00 AM — 4:00 PM' },
  { src: '/screenshots/ad-10.png', label: 'PXE Boot / WDS',    desc: 'WDS PXE boot — client contacts DHCP server (192.168.0.2) for OS image' },
  { src: '/screenshots/ad-11.png', label: 'WDS Deployment',    desc: 'Install Windows 10 over the network using Windows Deployment Services' },
  { src: '/screenshots/ad-12.png', label: 'Windows Installing',desc: 'Windows 10 installation in progress via WDS network deployment' },
  { src: '/screenshots/ad-13.png', label: 'Admin Script',      desc: 'Script: create l-admin user, add IT-Group to local Administrators for troubleshooting' },
  { src: '/screenshots/ad-14.png', label: 'Domain Join',       desc: 'Join Windows 10 workstation to Active Directory domain (AD DS)' },
]

/* ── Subcontractor Intervention System screenshots ── */
const INT_SCREENS = [
  { src: '/screenshots/int-1.png', label: 'Request Form',        desc: 'Valeo-branded New Involvement Request form — subcontractor, section, date, time, reason & workflow emails' },
  { src: '/screenshots/int-2.png', label: 'Dashboard',           desc: 'Live dashboard showing all requests with status badges — APPROVED, PENDING — and View Details links' },
  { src: '/screenshots/int-3.png', label: 'Intervention Details',desc: 'Full approval workflow view: N+1 Manager → HSE Dept → HR Dept → Plant Director — all timestamps visible' },
  { src: '/screenshots/int-4.png', label: 'Approval Email',      desc: 'Action Required email with one-time secret PIN (BSXXXB) sent to each approver via Nodemailer SMTP' },
  { src: '/screenshots/int-5.png', label: 'API Source Code',     desc: 'Next.js App Router API route — PIN validation, role-based approval chain, sendApprovalEmail trigger' },
  { src: '/screenshots/int-6.png', label: 'Final Approval Email',desc: 'Intervention Approved email with official Authorization PDF attached — sent automatically upon full approval' },
  { src: '/screenshots/int-7.png', label: 'Authorization PDF',   desc: 'Auto-generated Special Authorization PDF with Valeo logo, all details, and all approver signatures' },
  { src: '/screenshots/int-8.png', label: 'Supabase DB Schema',  desc: 'Supabase requests table: uuid, subcontractor, section, date, time, reason, emails, status, approvals (jsonb)' },
]

/* ── Windows 11 Migration Tracker screenshots ── */
const WIN11_SCREENS = [
  { src: '/screenshots/ps-migration.png', label: 'Daily Migration Report', desc: 'Automated email report: per-site Win10/Win11 stats (45.83% vs 54.17%) + full computer details table sent daily to admins' },
]

/* ── Windows Server Backup screenshots ── */
const BACKUP_SCREENS = [
  { src: '/screenshots/backup-1.png',  label: 'Server Manager',        desc: 'Step 1 — Open Server Manager → Manage → Add Roles and Features' },
  { src: '/screenshots/backup-2.png',  label: 'Install Feature',       desc: 'Step 2 — Select Windows Server Backup from the Features list and install' },
  { src: '/screenshots/backup-3.png',  label: 'Confirm Installation',  desc: 'Step 3 — Confirm installation and click Install to add the backup feature' },
  { src: '/screenshots/backup-4.png',  label: 'Local Backup Console',  desc: 'Step 4 — Open Windows Server Backup → Local Backup → click Backup Schedule' },
  { src: '/screenshots/backup-5.png',  label: 'Backup Configuration', desc: 'Step 5 — Select Full Server backup (recommended) — protects all data, apps & system state (1.28 TB)' },
  { src: '/screenshots/backup-6.png',  label: 'Backup Time',          desc: 'Step 6 — Schedule backup once a day at 2:00 AM for minimal production impact' },
  { src: '/screenshots/backup-7.png',  label: 'Destination Type',     desc: 'Step 7 — Choose destination: dedicated disk, volume, or shared network folder' },
  { src: '/screenshots/backup-8.png',  label: 'Remote Shared Folder', desc: 'Step 8 — Specify the remote shared folder path (\\\\Server\\Share) with Inherit access control' },
  { src: '/screenshots/backup-9.png',  label: 'Confirmation',         desc: 'Step 9 — Review final settings: 2:00 AM daily, VSS Full Backup, bare metal + C: + D: + system state' },
  { src: '/screenshots/backup-10.png', label: 'Task Scheduler',       desc: 'Step 10 — Verify backup task in Task Scheduler: Microsoft-W... Ready, triggers at 2:00 AM every day' },
  { src: '/screenshots/backup-11.png', label: 'Task Properties',      desc: 'Step 11 — Confirm task runs whether user is logged on or not, with highest privileges, on Windows Server 2022' },
]

/* ── Inactive PC Monitoring screenshots ── */
const INACTIVE_SCREENS = [
  { src: '/screenshots/ps-inactive.png', label: 'IT Monitoring Report Email', desc: 'Automated HTML email alert: 48 inactive PCs detected across Manufacturing & Desktop OUs (over 3 days) — includes computer name, last activity, days inactive, ping status and OS details per site' },
]

const OTHER_PROJECTS: never[] = []

const FILTERS = ['all', 'industrial', 'automation', 'sysadmin', 'web', 'fullstack', 'powershell', 'ai']

/* ── RoadmapModal ── */
function RoadmapModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  const phases = [
    { v: 'V1', label: '2 weeks', title: 'OPC UA + DB + Anomaly Detection', color: '#34d399', items: ['OPC UA connection to Engel machine', 'Tag mapping: Cycle Time, Pressure, Temperature, Status', 'Python collector every 5s via Telegraf', 'InfluxDB historical database', 'Isolation Forest AI anomaly detection', 'Grafana dashboard v1'] },
    { v: 'V2', label: '1 month', title: 'Health Score + Root Cause Analysis', color: '#60a5fa', items: ['Machine Health Score (0-100)', 'Root cause identification per anomaly', 'Alerting: Email', 'Dashboard v2 with full KPIs'] },
    { v: 'V3', label: '2-3 months', title: 'Predictive Maintenance', color: '#f472b6', items: ['Failure probability prediction (next 5 days)', 'Remaining Useful Life (RUL) estimation', 'Preventive maintenance scheduling', 'Historical trend analysis'] },
    { v: 'V4', label: 'Future', title: 'AI Assistant — Engel', color: '#ffd580', items: ['Natural language Q&A: "Why did the machine stop?"', 'OPC UA data + alarm + trend analysis by AI', 'Automatic process optimization suggestions', 'Reduce injection pressure by 3% recommendation'] },
  ]
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,12,28,0.92)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 860, background: 'rgba(15,30,60,0.98)', border: '1px solid #ffd58040', borderRadius: 16, boxShadow: '0 32px 80px rgba(0,0,0,0.6)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.4rem' }}>🚧</span>
            <div>
              <div style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>IN PROGRESS — ROADMAP</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>Engel Predictive Intelligence Platform (EPIP)</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '6px 16px', fontFamily: 'DM Mono', fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>✕ Close</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '24px' }}>
          <p style={{ fontFamily: 'DM Mono', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginBottom: 24, lineHeight: 1.7 }}>Intelligent system collecting real-time data from an Engel machine via OPC UA, storing historical data, detecting abnormal behavior using AI, evolving into a full predictive maintenance platform.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {phases.map((phase, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${phase.color}30`, borderRadius: 12, padding: '18px 20px', borderLeft: `3px solid ${phase.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', fontWeight: 700, color: phase.color, background: `${phase.color}18`, border: `1px solid ${phase.color}40`, borderRadius: 6, padding: '3px 10px' }}>{phase.v}</span>
                  <span style={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}>{phase.label}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{phase.title}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {phase.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                      <span style={{ color: phase.color, flexShrink: 0 }}>◈</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── PLCCard ── */
function PLCCard() {
  const [roadmapOpen, setRoadmapOpen] = useState(false)
  const ac = '#ffd580'
  return (
    <>
      <div className="card" style={{ marginBottom: 24, overflow: 'hidden', padding: 0 }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${ac}, rgba(255,255,255,0.2), transparent)` }} />
        <div style={{ padding: '24px 20px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="font-display gradient-text" style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', lineHeight: 1 }}>01</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <h3 style={{ fontWeight: 600, fontSize: 'clamp(1rem,3vw,1.3rem)', color: '#fff' }}>Engel Predictive Intelligence Platform (EPIP)</h3>
                  <span style={{ padding: '3px 10px', background: `${ac}1a`, border: `1px solid ${ac}45`, borderRadius: 6, fontFamily: 'DM Mono', fontSize: '0.6rem', color: ac }}>INDUSTRIAL</span>
                  <span style={{ padding: '3px 10px', background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: 6, fontFamily: 'DM Mono', fontSize: '0.6rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399', display: 'inline-block' }} />
                    IN PROGRESS · 2026
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)' }}>Valeo Tunisia · Engel Machine · OPC UA · AI Predictive Monitoring</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Python', 'OPC-UA', 'InfluxDB', 'Grafana', 'Telegraf', 'Isolation Forest'].map(t => <span key={t} className="tag" style={{ fontSize: '0.6rem' }}>{t}</span>)}
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.88rem', lineHeight: 1.82, marginBottom: 18 }}>Intelligent monitoring system for an Engel injection molding machine using OPC UA. Collects real-time telemetry (cycle time, injection pressure, mold temperature, machine status), stores historical data in InfluxDB via Telegraf, detects abnormal behavior using AI (Isolation Forest), and surfaces live dashboards in Grafana with automated alerting, building the foundation for full predictive maintenance.</p>
          <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
            {[{ v: 'V1-V4', l: 'Roadmap Phases', sub: '4 evolution versions' }, { v: 'OPC UA', l: 'Data Source', sub: 'Engel machine tags' }, { v: 'AI', l: 'Anomaly Engine', sub: 'Isolation Forest' }, { v: '5s', l: 'Sample Rate', sub: 'Real-time collection' }].map(m => (
              <div key={m.l} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '10px 12px' }}>
                <div className="font-display gradient-text" style={{ fontSize: '1.3rem', lineHeight: 1 }}>{m.v}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 500, marginTop: 4, color: '#fff' }}>{m.l}</div>
                <div className="font-mono" style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.36)', marginTop: 2 }}>{m.sub}</div>
              </div>
            ))}
          </div>
          <div className="highlights-row" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'start' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '14px 16px' }}>
              <div className="font-mono" style={{ fontSize: '0.62rem', color: ac, letterSpacing: '0.15em', marginBottom: 10 }}>WHAT IS BEING BUILT</div>
              {['OPC UA connectivity to Engel machine — tag mapping: Cycle Time, Pressure, Temperature, Status', 'Python collector service feeding InfluxDB via Telegraf at 5-second intervals', 'Isolation Forest AI model trained on normal machine behavior to detect anomalies', 'Grafana dashboard: live KPIs, health score, active anomalies, historical trends', 'Automated alerting via Email on threshold breach', 'Roadmap to V4: Predictive Maintenance + Root Cause Analysis + AI Assistant'].map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: '0.8rem', color: 'rgba(255,255,255,0.60)', marginBottom: i < arr.length - 1 ? 8 : 0, lineHeight: 1.55 }}>
                  <span style={{ color: ac, flexShrink: 0, marginTop: 2 }}>◈</span><span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 6 }}>
              <button onClick={() => setRoadmapOpen(true)} style={{ padding: '14px 22px', background: `linear-gradient(135deg, ${ac}20, ${ac}0d)`, border: `1px solid ${ac}55`, borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.74rem', color: ac, letterSpacing: '0.07em', transition: 'all 0.25s', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
                onMouseOver={e => { e.currentTarget.style.background = `${ac}28`; e.currentTarget.style.boxShadow = `0 0 28px ${ac}28`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${ac}80` }}
                onMouseOut={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${ac}20, ${ac}0d)`; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${ac}55` }}>
                <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>🚧</span>
                <span>View Roadmap</span>
              </button>
              <div style={{ fontFamily: 'DM Mono', fontSize: '0.57rem', color: 'rgba(255,255,255,0.28)', textAlign: 'center' }}>V1 → V4 planned</div>
            </div>
          </div>
        </div>
      </div>
      {roadmapOpen && <RoadmapModal onClose={() => setRoadmapOpen(false)} />}
    </>
  )
}
/* ─────────────────────────────────────────────────
   Evidence Modal — full-screen popup with gallery
───────────────────────────────────────────────── */
function EvidenceModal({
  title, screens, accentColor, onClose,
}: {
  title: string
  screens: { src: string; label: string; desc: string }[]
  accentColor: string
  onClose: () => void
}) {
  const [idx, setIdx] = useState(0)

  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(screens.length - 1, i + 1))

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(5, 12, 28, 0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Modal panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1100,
          background: 'rgba(15, 30, 60, 0.98)',
          border: `1px solid ${accentColor}40`,
          borderRadius: 16,
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}18`,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* Header bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: accentColor, boxShadow: `0 0 10px ${accentColor}`,
            }} />
            <span style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>
              PROJECT EVIDENCE
            </span>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
              {idx + 1} / {screens.length}
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8, padding: '6px 16px',
                fontFamily: 'DM Mono', fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.65)', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(255,80,80,0.18)'
                e.currentTarget.style.borderColor = 'rgba(255,100,100,0.4)'
                e.currentTarget.style.color = '#ff8080'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
              }}
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Body: main image + thumbnail sidebar */}
        <div className="modal-body" style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

          {/* Left — main image */}
          <div style={{
            flex: 1, position: 'relative',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img
              key={idx}
              src={screens[idx].src}
              alt={screens[idx].label}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
            />

            {/* caption */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(5,15,40,0.92))',
              padding: '48px 24px 18px',
            }}>
              <div style={{ fontFamily: 'DM Mono', fontSize: '0.62rem', color: accentColor, letterSpacing: '0.12em', marginBottom: 4 }}>
                {screens[idx].label}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.68)' }}>
                {screens[idx].desc}
              </div>
            </div>

            {/* Prev arrow */}
            {idx > 0 && (
              <button onClick={prev} style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(15,30,60,0.88)', border: `1px solid ${accentColor}45`,
                borderRadius: 10, width: 42, height: 42, fontSize: '1.2rem',
                color: accentColor, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
                onMouseOver={e => { e.currentTarget.style.background = `${accentColor}20` }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(15,30,60,0.88)' }}
              >‹</button>
            )}

            {/* Next arrow */}
            {idx < screens.length - 1 && (
              <button onClick={next} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(15,30,60,0.88)', border: `1px solid ${accentColor}45`,
                borderRadius: 10, width: 42, height: 42, fontSize: '1.2rem',
                color: accentColor, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
                onMouseOver={e => { e.currentTarget.style.background = `${accentColor}20` }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(15,30,60,0.88)' }}
              >›</button>
            )}
          </div>

          {/* Right — thumbnail sidebar */}
          <div style={{
            width: 158, flexShrink: 0,
            borderLeft: '1px solid rgba(255,255,255,0.07)',
            overflowY: 'auto', padding: '10px 9px',
            display: 'flex', flexDirection: 'column', gap: 7,
          }}>
            {screens.map((s, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                title={s.label}
                style={{
                  display: 'block', width: '100%', padding: 0,
                  borderRadius: 7, overflow: 'hidden',
                  border: `2px solid ${i === idx ? accentColor : 'rgba(255,255,255,0.07)'}`,
                  background: 'none', cursor: 'pointer',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: i === idx ? `0 0 12px ${accentColor}40` : 'none',
                  flexShrink: 0,
                }}
              >
                <img
                  src={s.src} alt={s.label}
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  padding: '5px 7px',
                  fontFamily: 'DM Mono', fontSize: '0.55rem',
                  color: i === idx ? accentColor : 'rgba(255,255,255,0.36)',
                  lineHeight: 1.3, textAlign: 'left',
                  background: i === idx ? `${accentColor}10` : 'transparent',
                  transition: 'all 0.2s',
                }}>
                  {i + 1}. {s.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Featured project card — compact, no inline gallery
───────────────────────────────────────────────── */
function FeaturedCard({
  number, title, subtitle, badge, tags, desc, metrics, highlights, screens, accentColor,
}: {
  number: string; title: string; subtitle: string; badge: string;
  tags: string[]; desc: string;
  metrics: { v: string; l: string; sub: string }[];
  highlights: string[];
  screens: { src: string; label: string; desc: string }[];
  accentColor: string;
}) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="card" style={{ marginBottom: 24, overflow: 'hidden', padding: 0 }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${accentColor}, rgba(255,255,255,0.2), transparent)` }} />
        <div style={{ padding: '24px 20px 28px' }}>

          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="font-display gradient-text" style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', lineHeight: 1 }}>{number}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <h3 style={{ fontWeight: 600, fontSize: 'clamp(1rem,3vw,1.3rem)', color: '#fff' }}>{title}</h3>
                  <span style={{
                    padding: '3px 10px',
                    background: `${accentColor}1a`,
                    border: `1px solid ${accentColor}45`,
                    borderRadius: 6, fontFamily: 'DM Mono', fontSize: '0.6rem', color: accentColor,
                  }}>{badge}</span>
                </div>
                <div className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)' }}>{subtitle}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {tags.map(t => <span key={t} className="tag" style={{ fontSize: '0.6rem' }}>{t}</span>)}
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.88rem', lineHeight: 1.82, marginBottom: 18 }}>{desc}</p>

          {/* Metrics */}
          <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
            {metrics.map(m => (
              <div key={m.l} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 8, padding: '10px 12px',
              }}>
                <div className="font-display gradient-text" style={{ fontSize: '1.3rem', lineHeight: 1 }}>{m.v}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 500, marginTop: 4, color: '#fff' }}>{m.l}</div>
                <div className="font-mono" style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.36)', marginTop: 2 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Highlights + Review button */}
          <div className="highlights-row" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'start' }}>
            {/* What was built */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div className="font-mono" style={{ fontSize: '0.62rem', color: accentColor, letterSpacing: '0.15em', marginBottom: 10 }}>WHAT WAS BUILT</div>
              {highlights.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10,
                  fontSize: '0.8rem', color: 'rgba(255,255,255,0.60)',
                  marginBottom: i < highlights.length - 1 ? 8 : 0, lineHeight: 1.55,
                }}>
                  <span style={{ color: accentColor, flexShrink: 0, marginTop: 2 }}>◈</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Review Evidence button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 6 }}>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  padding: '14px 22px',
                  background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}0d)`,
                  border: `1px solid ${accentColor}55`,
                  borderRadius: 10, cursor: 'pointer',
                  fontFamily: 'DM Mono', fontSize: '0.74rem',
                  color: accentColor, letterSpacing: '0.07em',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = `${accentColor}28`
                  e.currentTarget.style.boxShadow = `0 0 28px ${accentColor}28`
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.borderColor = `${accentColor}80`
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${accentColor}20, ${accentColor}0d)`
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = `${accentColor}55`
                }}
              >
                <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>🔍</span>
                <span>Review Evidence</span>
              </button>
              <div style={{
                fontFamily: 'DM Mono', fontSize: '0.57rem',
                color: 'rgba(255,255,255,0.28)', textAlign: 'center',
              }}>
                {screens.length} screenshots
              </div>
            </div>
          </div>

        </div>
      </div>

      {modalOpen && (
        <EvidenceModal
          title={title}
          screens={screens}
          accentColor={accentColor}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

/* ─────────────────────────────────────────────────
   Main Projects section
───────────────────────────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState('all')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.06 })
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const showBadge    = filter === 'all' || filter === 'automation'
  const showAD     = filter === 'all' || filter === 'sysadmin'
  const showInt    = filter === 'all' || filter === 'fullstack' || filter === 'web'
  const showWin11    = filter === 'all' || filter === 'powershell' || filter === 'automation'
  const showBackup   = filter === 'all' || filter === 'sysadmin'
  const showInactive = filter === 'all' || filter === 'powershell' || filter === 'automation'
  const showAI       = filter === 'all' || filter === 'ai' || filter === 'sysadmin'
  const showMagic    = filter === 'all' || filter === 'ai' || filter === 'industrial'
  const showPLC      = filter === 'all' || filter === 'industrial' || filter === 'ai'
  const others       = filter === 'all' ? OTHER_PROJECTS : OTHER_PROJECTS.filter(p => p.category === filter)

  return (
    <section id="projects" ref={sectionRef} style={{ padding: '80px 24px', maxWidth: 1240, margin: '0 auto' }}>

      {/* Header */}
      <div className="reveal" style={{ marginBottom: 52 }}>
        <div className="section-label">— WORK</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 1.05 }}>
            Selected<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>projects</em>
          </h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '8px 18px', borderRadius: 8, border: '1px solid', cursor: 'pointer',
                fontFamily: 'DM Mono', fontSize: '0.72rem', letterSpacing: '0.08em', transition: 'all 0.2s',
                borderColor: filter === f ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                background:  filter === f ? 'rgba(255,213,128,0.12)' : 'rgba(255,255,255,0.06)',
                color:       filter === f ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
              }}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED 01: EPIP ── */}
      {showPLC && (
        <div>
          <PLCCard />
        </div>
      )}

      {/* ── FEATURED 02: Magic Eye ── */}
      {showMagic && (
        <div>
          <FeaturedCard
            number="02"
            title="Magic Eye — AI Visual Inspection System"
            subtitle="Valeo Tunisia · 2025 · AI · Industrial Vision"
            badge="AI VISION"
            accentColor="#7eecd8"
            tags={['NVIDIA Jetson', 'Python', 'REST API', 'Modbus TCP', 'PLC', 'OpenCV', 'Deep Learning', 'Linux']}
            desc="Industrial AI vision system for real-time quality inspection. Master Jetson aggregates CAM1+CAM2 feeds, runs AI top-surface defect detection, and coordinates 4 Slave Jetsons via REST API. Results sent to PLC via Modbus TCP to trigger OK/NOK motor actions with live Visual Inspection dashboard."
            metrics={[
              { v: '2',   l: 'Cameras',         sub: 'CAM1 + CAM2 top view' },
              { v: '1+4', l: 'Jetson Units',    sub: 'Master + 4 Slaves' },
              { v: 'TCP', l: 'Modbus Protocol', sub: 'PLC motor control' },
              { v: 'AI',  l: 'Vision Models',   sub: 'Top + Side detection' },
            ]}
            highlights={[
              'Master Jetson runs AI Model TOP for top-surface defect detection via CAM1 + CAM2',
              'REST API coordination between Master and 4 Slave Jetsons running AI Model SIDE',
              'Modbus TCP integration with PLC to trigger MOTOR OK/NOK in real time',
              'Live Visual Inspection dashboard with defect overlays and sequence status',
              'Full VLAN network architecture with EasyNAC and cybersecurity compliance',
              'Multi-zone inspection: top surface + 4 side surfaces per production cycle',
            ]}
            screens={[
              { src: '/screenshots/ai-line.png', label: 'Communication Architecture', desc: 'CAM1/CAM2 → Master Jetson → REST API → Slave Jetsons → Modbus TCP → PLC → Motors' },
            ]}
          />
        </div>
      )}

      {/* ── FEATURED 03: Badge Correction System ── */}
      {showBadge && (
        <div>
          <FeaturedCard
            number="03"
            title="Badge Correction System"
            subtitle="Valeo Tunisia · 2024 — 2026 · industrial"
            badge="FLAGSHIP"
            accentColor="#ffd580"
            tags={['n8n', 'Supabase', 'PostgreSQL', 'Gmail SMTP', 'PDF Gen', 'HTML Form']}
            desc="Full automation system at Valeo replacing a 100% manual paper-based badge correction process. Employees submit corrections via a branded web form; the request flows sequentially through a 4-level hierarchical approval chain (N+1 Chef Direct → N+2 Responsable Service → N+3 Directeur Site → N+4 Directeur RH) via n8n, with email notifications and one-click approval links at every step, Supabase persistence, and a final official PDF generated upon full approval."
            metrics={[
              { v: '4',    l: 'Approval Levels', sub: 'N+1 → N+4' },
              { v: '100%', l: 'Automated',        sub: 'Was manual' },
              { v: 'PDF',  l: 'Final Output',     sub: 'Auto-generated' },
              { v: 'n8n',  l: 'Workflow Engine',  sub: '+ Supabase DB' },
            ]}
            highlights={[
              'Web form with Valeo branding & Sunday-block validation',
              'n8n automation: webhook → validation → DB insert → 4× approval emails',
              'Approval UI embedded in email (Approuver / Rejeter buttons)',
              'Supabase DB: demandes + validations tables',
              'Auto PDF generation on final approval + employee notification',
            ]}
            screens={BADGE_SCREENS}
          />
        </div>
      )}

      {/* ── FEATURED 04: Active Directory Home Lab ── */}
      {showAD && (
        <div>
          <FeaturedCard
            number="04"
            title="Active Directory Home Lab"
            subtitle="Personal Lab · VMware Workstation · sysadmin"
            badge="HOME LAB"
            accentColor="#7eecd8"
            tags={['Windows Server 2019', 'Active Directory', 'GPO', 'WDS', 'DHCP', 'DNS', 'VMware', 'FSRM']}
            desc="Full Windows Server Administration home lab built on VMware Workstation to simulate a real enterprise environment. Configured Active Directory Domain Services from scratch, implemented Group Policy Objects for security and productivity, deployed Windows Deployment Services for PXE-based OS imaging, set up centralized Print Management, and joined client workstations to the domain — covering the complete lifecycle of enterprise IT infrastructure."
            metrics={[
              { v: 'AD DS', l: 'Domain Controller', sub: 'Windows Server 2019' },
              { v: '5+',    l: 'GPO Policies',      sub: 'Security & productivity' },
              { v: 'WDS',   l: 'PXE Deployment',    sub: 'Network OS imaging' },
              { v: 'VMware',l: 'Virtualization',    sub: 'Workstation lab' },
            ]}
            highlights={[
              'GPO: Password policy (90-day expiry, complexity, history)',
              'GPO: Drive mapping, Control Panel block, USB/removable storage restriction',
              'GPO: Account lockout — brute-force defense',
              'WDS: PXE boot — deploy Windows 10 images over the network without physical media',
              'Print Management: B&W default, restricted hours (8 AM — 4 PM)',
              'FSRM: File screening — block executables & media uploads',
              'Disk Quota: 2 GB limit, warning at 1 GB',
              'Domain join: client workstations added to AD DS with IT-Group local admin script',
            ]}
            screens={AD_SCREENS}
          />
        </div>
      )}

      {/* ── FEATURED 05: Subcontractor Intervention System ── */}
      {showInt && (
        <div>
          <FeaturedCard
            number="05"
            title="Subcontractor Intervention System"
            subtitle="Valeo Tunisia · 2026 · fullstack"
            badge="DEPLOYED"
            accentColor="#a78bfa"
            tags={['Next.js 16', 'TypeScript', 'Supabase', 'Nodemailer', 'PDFKit', 'Vercel']}
            desc="Full-stack web application digitizing the subcontractor intervention authorization process at Valeo. Replaces manual paper forms and endless email chains with a streamlined digital workflow: requesters submit via a branded form, each approver receives a secure one-time PIN by email, and upon full sign-off the system auto-generates and emails an official PDF authorization. Deployed on Vercel with a Supabase PostgreSQL backend."
            metrics={[
              { v: '4',      l: 'Approval Steps',  sub: 'N+1 → HSE → HR → Director' },
              { v: 'PIN',    l: 'Secure Auth',      sub: 'One-time code per approver' },
              { v: 'PDF',    l: 'Auto-generated',   sub: 'Official authorization doc' },
              { v: 'Vercel', l: 'Live Deploy',      sub: 'Next.js + Supabase' },
            ]}
            highlights={[
              'Branded request form: subcontractor, section, date/time, reason, workflow emails',
              'Nodemailer SMTP: unique PIN code emailed to each approver in sequence',
              'Next.js App Router API — role-based PIN validation & approval chain logic',
              'Supabase PostgreSQL: requests table with approvals stored as JSONB',
              'PDFKit: Special Authorization PDF auto-generated with Valeo logo & signatures',
              'Live dashboard: all requests with status badges, View Details, auto-hide after 7 days',
              'Real-time approval tracking: timestamps per approver visible in detail view',
            ]}
            screens={INT_SCREENS}
          />
        </div>
      )}

      {/* ── FEATURED 06: Windows 11 Migration Tracker ── */}
      {showWin11 && (
        <div>
          <FeaturedCard
            number="06"
            title="Windows 11 Migration Tracker"
            subtitle="Valeo Tunisia · Multi-site · 2025 · powershell"
            badge="POWERSHELL"
            accentColor="#60a5fa"
            tags={['PowerShell', 'Active Directory', 'SMTP', 'HTML Report', 'Multi-site']}
            desc="PowerShell script automating real-time Windows 10 → 11 migration tracking across a multi-site Active Directory infrastructure. Scans all domain computers, computes per-site Win10/Win11 statistics, generates structured HTML email reports with full computer detail tables, and sends automated daily alerts to administrators — enabling precise planning ahead of the Windows 10 end-of-support deadline (October 2025)."
            metrics={[
              { v: '100%',  l: 'Coverage Goal',   sub: 'Seamless migration' },
              { v: 'Daily', l: 'Auto Reports',     sub: 'SMTP email delivery' },
              { v: '2',     l: 'Sites Tracked',    sub: 'Multi-site AD scan' },
              { v: 'Win11', l: 'Target OS',        sub: 'End-of-life planning' },
            ]}
            highlights={[
              'Scans all computers across multi-site Active Directory automatically',
              'Per-site statistics: total computers, Win10 %, Win11 % breakdown',
              'Structured HTML report with computer name + OS version detail table',
              'Daily automated email via SMTP — no manual intervention needed',
              'Tracks migration progress toward 100% Windows 11 adoption',
              'Planned ahead of Windows 10 end-of-support: October 2025',
            ]}
            screens={WIN11_SCREENS}
          />
        </div>
      )}

      {/* ── FEATURED 07: Windows Server Backup ── */}
      {showBackup && (
        <div>
          <FeaturedCard
            number="07"
            title="Windows Server Backup Setup"
            subtitle="Valeo Tunisia · Windows Server 2022 · sysadmin"
            badge="SYSADMIN"
            accentColor="#34d399"
            tags={['Windows Server 2022', 'WSB', 'Task Scheduler', 'VSS', 'Disaster Recovery']}
            desc="End-to-end configuration of an enterprise-grade scheduled backup solution using Windows Server Backup on Windows Server 2022. Covers the full 11-step process from feature installation through backup schedule wizard, destination configuration (remote shared network folder), and Task Scheduler verification — ensuring backups run automatically at 2:00 AM daily, whether or not a user is logged on, with highest privileges."
            metrics={[
              { v: '2 AM',  l: 'Daily Schedule',   sub: 'Automated, no user needed' },
              { v: 'Full',  l: 'Server Backup',     sub: 'VSS + bare metal recovery' },
              { v: '11',    l: 'Steps Documented',  sub: 'Install to verification' },
              { v: 'WS22',  l: 'Platform',          sub: 'Windows Server 2022' },
            ]}
            highlights={[
              'Install Windows Server Backup feature via Server Manager Add Roles & Features',
              'Backup Schedule Wizard: Full Server — all data, apps, system state (1.28 TB)',
              'Scheduled daily at 2:00 AM — minimal production impact window',
              'Destination: remote shared network folder with Inherit access control',
              'VSS Full Backup — bare metal recovery + C: + D: + EFI + System State',
              'Task Scheduler verification: Ready status, confirmed next run time',
              'Task configured to run whether user is logged on or not, with highest privileges',
            ]}
            screens={BACKUP_SCREENS}
          />
        </div>
      )}

      {showInactive && (
        <div>
          <FeaturedCard
            number="08"
            title="Inactive PC Monitoring Script"
            subtitle="Valeo Tunisia · Active Directory · PowerShell Automation"
            badge="POWERSHELL"
            accentColor="#f472b6"
            tags={['PowerShell', 'Active Directory', 'SMTP', 'HTML Report', 'IT Automation']}
            desc="PowerShell-based solution to automate the detection and reporting of inactive computers in Active Directory. Auto-discovers all Organizational Units across multiple sites, identifies inactive machines based on a configurable threshold, generates structured HTML email reports with inactivity details, and falls back to local report export if email delivery fails — enabling IT teams to optimize AD hygiene and asset lifecycle control."
            metrics={[
              { v: '48',    l: 'PCs Detected',       sub: 'Inactive over 3 days' },
              { v: 'Auto',  l: 'OU Discovery',        sub: 'Multi-site, zero config' },
              { v: 'HTML',  l: 'Email Report',         sub: 'Structured & color-coded' },
              { v: 'SMTP',  l: 'Alert Delivery',       sub: 'With credential auth' },
            ]}
            highlights={[
              'Automatic OU discovery across all AD sites — no manual configuration needed',
              'Configurable inactivity threshold (default: 3 days) with last-activity timestamp',
              'Structured HTML report: computer name, description, last activity, days inactive, ping status, OS',
              'Color-coded status badges (Offline/Online) and per-OU grouping in the email body',
              'SMTP automation with optional credential-based authentication for secure relay',
              'Local HTML export fallback if email delivery fails — no alert is ever lost',
              'Reduces AD bloat and improves infrastructure hygiene through scheduled automation',
            ]}
            screens={INACTIVE_SCREENS}
          />
        </div>
      )}




      {/* ── Other projects grid ── */}
      {others.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 18 }}>
          {others.map((p, i) => (
            <div key={p.id} className="reveal card" style={{ padding: 0, overflow: 'hidden', transitionDelay: `${i * 0.06}s` }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
              {/* optional screenshot preview */}
              {(p as any).screen && (
                <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={(p as any).screen} alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: 0.85 }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(15,30,60,1))' }} />
                </div>
              )}
              <div style={{ padding: '22px 26px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span className="font-display gradient-text" style={{ fontSize: '2.6rem', lineHeight: 1 }}>{p.number}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)' }}>{p.year}</span>
                    <span className="tag" style={{ fontSize: '0.62rem' }}>{p.category}</span>
                  </div>
                </div>
                <h3 style={{ fontWeight: 500, fontSize: '1rem', marginBottom: 9, lineHeight: 1.35 }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tags.map(tag => <span key={tag} className="tag" style={{ fontSize: '0.62rem' }}>{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {others.length === 0 && !showBadge && !showAD && !showInt && !showWin11 && !showBackup && !showInactive && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono', fontSize: '0.8rem' }}>
          No projects in this category yet.
        </div>
      )}
    </section>
  )
}


