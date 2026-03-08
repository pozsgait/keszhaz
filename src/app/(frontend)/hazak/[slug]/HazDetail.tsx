import Link from 'next/link'
import Image from 'next/image'
import styles from './HazDetail.module.css'

function formatPrice(price: number) {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency', currency: 'HUF', maximumFractionDigits: 0,
  }).format(price)
}

const roofLabels: Record<string, string> = {
  gable: 'Nyeregtető', hip: 'Sátortető',
  flat: 'Lapostető', hipped: 'Kontyolt tető', other: 'Egyéb',
}
const wallLabels: Record<string, string> = {
  brick: 'Tégla', poroton: 'Poroton',
  lightweight: 'Könnyűszerkezet', concrete: 'Beton', other: 'Egyéb',
}
const heatingLabels: Record<string, string> = {
  gas: 'Gáz', heat_pump: 'Hőszivattyú', electric: 'Elektromos',
  wood: 'Fa / Pellet', solar: 'Napkollektor',
}
const coolingLabels: Record<string, string> = {
  ac: 'Klíma', heat_pump: 'Hőszivattyú',
  natural: 'Természetes szellőzés', none: 'Nincs',
}
const categoryLabels: Record<string, string> = {
  small: 'Kis ház', family: 'Családi ház',
  large: 'Nagy ház', villa: 'Villa', twostorey: 'Emeletes',
}
const priceCategoryLabels: Record<string, string> = {
  budget: 'Gazdaságos', mid: 'Középkategória',
  premium: 'Prémium', luxury: 'Luxus',
}

type MediaItem = {
  url?: string
  alt?: string
  width?: number
  height?: number
}

type ImageEntry = {
  image?: MediaItem | null
  caption?: string
}

type FloorPlanEntry = {
  image?: MediaItem | null
  label?: string
}

type House = {
  id: string
  name: string
  slug: string
  shortDescription?: string | null  // ← null hozzáadva
  description?: unknown
  area: number
  builtArea?: number | null
  rooms: number
  bathrooms: number
  floors: number
  priceFrom?: number | null
  priceCategory?: string | null
  category?: string | null
  style?: string[] | null
  roofType?: string | null
  wallStructure?: string | null
  heating?: string[] | null
  cooling?: string[] | null
  energyRating?: string | null
  minPlotSize?: number | null
  minPlotWidth?: number | null
  terraceSize?: number | null
  masterBathroom?: boolean | null
  wardrobe?: boolean | null
  chimney?: boolean | null
  featured?: boolean | null
  images?: ImageEntry[] | null
  floorPlans?: FloorPlanEntry[] | null
}

export function HazDetail({ house }: { house: House }) {
  const images = house.images ?? []
  const floorPlans = house.floorPlans ?? []
  const mainImage = images[0]?.image
  const thumbs = images.slice(1, 3)

  return (
    <div className="container">
      <div className={styles.page}>

        {/* BREADCRUMB */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>Főoldal</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link href="/hazak" className={styles.breadcrumbLink}>Készházak</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{house.name}</span>
        </nav>

        {/* FEJLÉC */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.headerLabel}>
              {house.category ? categoryLabels[house.category] : 'Készház'}
            </p>
            <h1 className={styles.title}>{house.name}</h1>
            {house.shortDescription && (
              <p className={styles.shortDesc}>{house.shortDescription}</p>
            )}
          </div>
          <div className={styles.headerRight}>
            {house.priceFrom && (
              <>
                <div className={styles.price}>{formatPrice(house.priceFrom)}</div>
                <div className={styles.priceLabel}>-tól</div>
              </>
            )}
            {house.featured && (
              <span className={styles.badge}>Kiemelt ház</span>
            )}
          </div>
        </div>

        {/* GALÉRIA */}
        <div className={styles.gallery}>
          <div className={styles.galleryMain}>
            {mainImage?.url ? (
              <Image
                src={mainImage.url}
                alt={mainImage.alt ?? house.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <span>Látványterv</span>
            )}
          </div>
          {thumbs.map((t, i) => (
            <div key={i} className={styles.galleryThumb}>
              {t.image?.url ? (
                <Image
                  src={t.image.url}
                  alt={t.caption ?? `${house.name} ${i + 2}`}
                  width={600}
                  height={200}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              ) : (
                <span>Látványterv</span>
              )}
            </div>
          ))}
        </div>

        {/* FŐ ADATOK */}
        <div className={styles.statsGrid}>
          {[
            { value: `${house.area} m²`, label: 'Alapterület' },
            ...(house.builtArea ? [{ value: `${house.builtArea} m²`, label: 'Beépített terület' }] : []),
            { value: `${house.rooms}`, label: 'Szobák száma' },
            { value: `${house.bathrooms}`, label: 'Fürdők száma' },
            { value: `${house.floors}`, label: 'Szintek száma' },
            ...(house.terraceSize ? [{ value: `${house.terraceSize} m²`, label: 'Terasz' }] : []),
            ...(house.energyRating ? [{ value: house.energyRating, label: 'Energetika' }] : []),
            ...(house.minPlotSize ? [{ value: `${house.minPlotSize} m²`, label: 'Min. telekméret' }] : []),
          ].map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* TARTALOM + OLDALSÁV */}
        <div className={styles.content}>
          <div>
            {/* LEÍRÁS */}
            {house.shortDescription && (
              <div className={styles.descSection}>
                <h2 className={styles.sectionTitle}>A házról</h2>
                <p className={styles.descText}>{house.shortDescription}</p>
              </div>
            )}

            {/* ALAPRAJZOK */}
            {floorPlans.length > 0 && (
              <div className={styles.floorPlans}>
                <h2 className={styles.sectionTitle}>Alaprajzok</h2>
                <div className={styles.floorPlanGrid}>
                  {floorPlans.map((fp, i) => (
                    <div key={i} className={styles.floorPlanItem}>
                      <div className={styles.floorPlanImage}>
                        {fp.image?.url ? (
                          <Image
                            src={fp.image.url}
                            alt={fp.label ?? `Alaprajz ${i + 1}`}
                            width={400}
                            height={300}
                            style={{ objectFit: 'contain' }}
                          />
                        ) : (
                          <span>Alaprajz</span>
                        )}
                      </div>
                      {fp.label && (
                        <div className={styles.floorPlanLabel}>{fp.label}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* OLDALSÁV – MŰSZAKI ADATOK */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarCardTitle}>Műszaki adatok</div>

              {house.roofType && (
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Tető típusa</span>
                  <span className={styles.dataValue}>{roofLabels[house.roofType]}</span>
                </div>
              )}
              {house.wallStructure && (
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Falszerkezet</span>
                  <span className={styles.dataValue}>{wallLabels[house.wallStructure]}</span>
                </div>
              )}
              {house.heating && house.heating.length > 0 && (
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Fűtés</span>
                  <span className={styles.dataValue}>
                    {house.heating.map((h) => heatingLabels[h]).join(', ')}
                  </span>
                </div>
              )}
              {house.cooling && house.cooling.length > 0 && (
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Hűtés</span>
                  <span className={styles.dataValue}>
                    {house.cooling.map((c) => coolingLabels[c]).join(', ')}
                  </span>
                </div>
              )}
              {house.energyRating && (
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Energetika</span>
                  <span className={`${styles.dataValue} ${styles.dataValueAccent}`}>
                    {house.energyRating}
                  </span>
                </div>
              )}
              {house.minPlotSize && (
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Min. telek</span>
                  <span className={styles.dataValue}>{house.minPlotSize} m²</span>
                </div>
              )}
              {house.minPlotWidth && (
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Min. telekszélesség</span>
                  <span className={styles.dataValue}>{house.minPlotWidth} m</span>
                </div>
              )}
              {house.priceCategory && (
                <div className={styles.dataRow}>
                  <span className={styles.dataLabel}>Árkategória</span>
                  <span className={styles.dataValue}>
                    {priceCategoryLabels[house.priceCategory]}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.sidebarCard}>
              <div className={styles.sidebarCardTitle}>Jellemzők</div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Szülői fürdő</span>
                <span className={styles.dataValue}>{house.masterBathroom ? '✓ Igen' : '–'}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Gardrób</span>
                <span className={styles.dataValue}>{house.wardrobe ? '✓ Igen' : '–'}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>Kémény</span>
                <span className={styles.dataValue}>{house.chimney ? '✓ Igen' : '–'}</span>
              </div>
            </div>

            {/* CTA */}
            <div className={styles.cta}>
              <h3 className={styles.ctaTitle}>Érdekli ez a ház?</h3>
              <p className={styles.ctaText}>
                Kérjen ingyenes konzultációt és személyre szabott ajánlatot.
              </p>
              <Link href="/kapcsolat" className={styles.ctaBtn}>
                Ajánlatot kérek →
              </Link>
              <Link href="/hazak" className={styles.backLink}>
                ← Vissza a katalógushoz
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
