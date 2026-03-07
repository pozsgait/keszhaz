'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/',            label: 'Főoldal' },
  { href: '/rolunk',      label: 'Rólunk' },
  { href: '/hazak',       label: 'Készházak' },
  { href: '/referenciak', label: 'Referenciák' },
  { href: '/kapcsolat',   label: 'Kapcsolat' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(245,242,237,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #D4CFC6' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

        {/* Logó */}
        <Link href="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem',
            fontWeight: 900,
            color: 'var(--color-dark)',
            letterSpacing: '-0.02em',
          }}>
            ÉPÍTŐ
          </span>
          <span style={{
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'var(--color-accent)',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}>
            Készházak & Építés
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.05em',
                color: pathname === item.href ? 'var(--color-accent)' : 'var(--color-text)',
                borderBottom: pathname === item.href ? '1px solid var(--color-accent)' : '1px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kapcsolat"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              borderRadius: '2px',
              transition: 'background-color 0.2s',
            }}
          >
            Ajánlatot kérek
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label="Menü"
        >
          {[0,1,2].map((i) => (
            <span key={i} style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--color-dark)',
              transition: 'all 0.3s',
              transformOrigin: 'center',
              transform: menuOpen
                ? i === 0 ? 'translateY(7px) rotate(45deg)'
                : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Mobil menü */}
      {menuOpen && (
        <div style={{
          backgroundColor: 'var(--color-bg)',
          borderTop: '1px solid var(--color-border)',
          padding: '1.5rem 2rem',
        }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--color-border)',
                fontSize: '1rem',
                color: pathname === item.href ? 'var(--color-accent)' : 'var(--color-text)',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kapcsolat"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              marginTop: '1rem',
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              padding: '0.75rem 1.25rem',
              textAlign: 'center',
              borderRadius: '2px',
            }}
          >
            Ajánlatot kérek
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

export default Header