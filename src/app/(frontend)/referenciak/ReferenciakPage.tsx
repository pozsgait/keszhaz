export function ReferenciakPage({ data }: { data: any }) {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Munkáink</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>{data.title || 'Referenciáink'}</h1>
      {data.subtitle && <p style={{ color: 'var(--color-muted)', marginBottom: '3rem' }}>{data.subtitle}</p>}
      <p style={{ color: 'var(--color-muted)' }}>Hamarosan...</p>
    </div>
  )
}
