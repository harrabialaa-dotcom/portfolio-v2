'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0   // mouse
    let rx = 0, ry = 0   // ring (lerped)
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) {
        dot.current.style.left = mx + 'px'
        dot.current.style.top  = my + 'px'
      }
    }

    const loop = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      if (ring.current) {
        ring.current.style.left = rx + 'px'
        ring.current.style.top  = ry + 'px'
      }
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)

    const expand = () => {
      if (!ring.current) return
      ring.current.style.width  = '56px'
      ring.current.style.height = '56px'
      ring.current.style.borderColor = 'var(--accent)'
      ring.current.style.background  = 'rgba(201,169,110,0.06)'
    }
    const shrink = () => {
      if (!ring.current) return
      ring.current.style.width  = '36px'
      ring.current.style.height = '36px'
      ring.current.style.borderColor = 'rgba(201,169,110,0.35)'
      ring.current.style.background  = 'transparent'
    }

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={ring} className="cursor-follower" />
    </>
  )
}
