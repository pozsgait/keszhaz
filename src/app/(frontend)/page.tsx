import Link from 'next/link'

export default function HomePage() {
  return (
    <main>

      {/* HERO */}
      <section style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-dark)',
      }}>
        {/* Háttér minta */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(42,39,32,0.85), rgba(42,39,32,0.92)),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.015) 40px,
              rgba(255,255,255,0.015) 41px
            )
          `,
        }} />

        <div className="container fade-up" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            color: 'var(--color-accent-lt)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            fontWeight: 500,
          }}>
            Minőségi Készházak — Határidőre
          </p>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            color: '#F5F2ED',
            maxWidth: '14ch',
            lineHeight: 1.05,
            marginBottom: '2rem',
          }}>
            Ahol az otthon<br />
            <em style={{ color: 'var(--color-accent-lt)', fontStyle: 'italic' }}>elkezdődik.</em>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#A09B94',
            maxWidth: '48ch',
            marginBottom: '3rem',
            fontWeight: 300,
            lineHeight: 1.8,
          }}>
            Modern készházak tégláztól a kulcsátadásig. Válasszon tervezett háztípusaink közül,
            vagy kérjen egyedi ajánlatot.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/hazak" style={{
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              padding: '0.9rem 2rem',
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              borderRadius: '2px',
              display: 'inline-block',
            }}>
              Készházak megtekintése →
            </Link>
            <Link href="/kapcsolat" style={{
              border: '1px solid rgba(245,242,237,0.3)',
              color: '#F5F2ED',
              padding: '0.9rem 2rem',
              fontSize: '0.95rem',
              fontWeight: 400,
              letterSpacing: '0.05em',
              borderRadius: '2px',
              display: 'inline-block',
            }}>
              Ajánlatot kérek
            </Link>
          </div>
        </div>

        {/* Dekoratív vonal */}
        <div style={{
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '1px',
          height: '40vh',
          backgroundColor: 'rgba(255,255,255,0.08)',
        }} />
      </section>

      {/* SZÁMOK */}
      <section style={{
        backgroundColor: 'var(--color-accent)',
        padding: '4rem 0',
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {[
            { num: '150+', label: 'Átadott ház' },
            { num: '18', label: 'Év tapasztalat' },
            { num: '12', label: 'Háztípus' },
            { num: '98%', label: 'Elégedett ügyfél' },
          ].map((s) => (
            <div key={s.num}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.8rem',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1,
              }}>{s.num}</div>
              <div style={{
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.75)',
                textTransform: 'uppercase',
                marginTop: '0.5rem',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* KIEMELT HÁZAK */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <p style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>Válogatás</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Kiemelt házaink</h2>
            </div>
            <Link href="/hazak" style={{
              fontSize: '0.875rem',
              color: 'var(--color-accent)',
              borderBottom: '1px solid var(--color-accent)',
              paddingBottom: '2px',
            }}>
              Összes megtekintése →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { name: 'Harmónia 115', area: 115, rooms: 4, price: '34 000 000' },
              { name: 'Mediterrán 145', area: 145, rooms: 5, price: '52 000 000' },
              { name: 'Prémium 175', area: 175, rooms: 5, price: '75 000 000' },
            ].map((h, i) => (
              <div key={h.name} className={`fade-up fade-up-${i + 1}`} style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '220px',
                  backgroundColor: '#D4CFC6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-stone)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                }}>
                  LÁTVÁNYTERV
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{h.name}</h3>
                  <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-muted)',
                    marginBottom: '1rem',
                  }}>
                    <span>{h.area} m²</span>
                    <span>{h.rooms} szoba</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.1rem',
                      color: 'var(--color-accent)',
                    }}>{h.price} Ft-tól</span>
                    <Link href="/hazak" style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-muted)',
                      borderBottom: '1px solid var(--color-border)',
                    }}>Részletek →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA sáv */}
      <section style={{
        backgroundColor: 'var(--color-dark)',
        padding: '6rem 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ color: '#F5F2ED', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '1.5rem' }}>
            Készen áll az álomotthonra?
          </h2>
          <p style={{ color: '#A09B94', marginBottom: '2.5rem', maxWidth: '50ch', margin: '0 auto 2.5rem' }}>
            Kérjen ingyenes konzultációt és ajánlatot. Szakértőink segítenek megtalálni
            az Önhöz illő háztípust.
          </p>
          <Link href="/kapcsolat" style={{
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: '2px',
            display: 'inline-block',
            letterSpacing: '0.05em',
          }}>
            Ingyenes konzultáció →
          </Link>
        </div>
      </section>

    </main>
  )
}