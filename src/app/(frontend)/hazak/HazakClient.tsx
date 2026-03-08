'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import styles from './HazakClient.module.css'
import type { House } from '@/payload-types'

/*
type House = {
  id: string
  name: string
  slug: string
  shortDescription?: string
  area: number
  rooms: number
  bathrooms: number
  floors: number
  priceFrom?: number
  priceCategory?: string
  category?: string
  style?: string[]
  roofType?: string
  heating?: string[]
  cooling?: string[]
  energyRating?: string
  featured?: boolean
  masterBathroom?: boolean
  wardrobe?: boolean
  chimney?: boolean
  terraceSize?: number
  minPlotSize?: number
  minPlotWidth?: number
  wallStructure?: string
}
*/
type Props = { houses: House[] }



function formatPrice(price: number) {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency', currency: 'HUF', maximumFractionDigits: 0,
  }).format(price)
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.filterSection}>
      <button className={styles.filterSectionBtn} onClick={() => setOpen(!open)}>
        {title}
        <span className={styles.filterSectionArrow}>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className={styles.filterSectionContent}>{children}</div>}
    </div>
  )
}

function CheckOption({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <label className={`${styles.checkLabel} ${checked ? styles.checkLabelActive : ''}`}>
      <input type="checkbox" checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkbox} />
      {label}
    </label>
  )
}

export function HazakClient({ houses }: Props) {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [priceCategories, setPriceCategories] = useState<string[]>([])
  const [styleFilters, setStyleFilters] = useState<string[]>([])
  const [roofTypes, setRoofTypes] = useState<string[]>([])
  const [wallStructures, setWallStructures] = useState<string[]>([])
  const [heatings, setHeatings] = useState<string[]>([])
  const [coolings, setCoolings] = useState<string[]>([])
  const [energyRatings, setEnergyRatings] = useState<string[]>([])
  const [minArea, setMinArea] = useState('')
  const [maxArea, setMaxArea] = useState('')
  const [minRooms, setMinRooms] = useState('')
  const [minBathrooms, setMinBathrooms] = useState('')
  const [minFloors, setMinFloors] = useState('')
  const [minTerrace, setMinTerrace] = useState('')
  const [onlyFeatured, setOnlyFeatured] = useState(false)
  const [onlyMasterBath, setOnlyMasterBath] = useState(false)
  const [onlyWardrobe, setOnlyWardrobe] = useState(false)
  const [onlyChimney, setOnlyChimney] = useState(false)

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = useMemo(() => houses.filter((h) => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) &&
        !h.shortDescription?.toLowerCase().includes(search.toLowerCase())) return false
    if (categories.length && !categories.includes(h.category || '')) return false
    if (priceCategories.length && !priceCategories.includes(h.priceCategory || '')) return false
    if (styleFilters.length && !h.style?.some((s) => styleFilters.includes(s))) return false
    if (roofTypes.length && !roofTypes.includes(h.roofType || '')) return false
    if (wallStructures.length && !wallStructures.includes(h.wallStructure || '')) return false
    if (heatings.length && !h.heating?.some((s) => heatings.includes(s))) return false
    if (coolings.length && !h.cooling?.some((s) => coolings.includes(s))) return false
    if (energyRatings.length && !energyRatings.includes(h.energyRating || '')) return false
    if (minArea && h.area < Number(minArea)) return false
    if (maxArea && h.area > Number(maxArea)) return false
    if (minRooms && h.rooms < Number(minRooms)) return false
    if (minBathrooms && h.bathrooms < Number(minBathrooms)) return false
    if (minFloors && h.floors < Number(minFloors)) return false
    if (minTerrace && (h.terraceSize || 0) < Number(minTerrace)) return false
    if (onlyFeatured && !h.featured) return false
    if (onlyMasterBath && !h.masterBathroom) return false
    if (onlyWardrobe && !h.wardrobe) return false
    if (onlyChimney && !h.chimney) return false
    return true
  }), [houses, search, categories, priceCategories, styleFilters, roofTypes,
    wallStructures, heatings, coolings, energyRatings, minArea, maxArea,
    minRooms, minBathrooms, minFloors, minTerrace,
    onlyFeatured, onlyMasterBath, onlyWardrobe, onlyChimney])

  function resetAll() {
    setSearch(''); setCategories([]); setPriceCategories([]); setStyleFilters([])
    setRoofTypes([]); setWallStructures([]); setHeatings([]); setCoolings([])
    setEnergyRatings([]); setMinArea(''); setMaxArea(''); setMinRooms('')
    setMinBathrooms(''); setMinFloors(''); setMinTerrace('')
    setOnlyFeatured(false); setOnlyMasterBath(false)
    setOnlyWardrobe(false); setOnlyChimney(false)
  }

  return (
    <div className={`container ${styles.page}`}>

      <div className={styles.header}>
        <p className={styles.headerLabel}>Katalógus</p>
        <h1 className={styles.title}>Készházaink</h1>
      </div>

      <div className={styles.layout}>

        {/* ── OLDALSÁV ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>Szűrők</span>
              <button className={styles.resetBtn} onClick={resetAll}>Törlés</button>
            </div>

            <input type="text" placeholder="Keresés..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput} />

            <FilterSection title="Alapterület (m²)">
              <div className={styles.inputRow}>
                <input type="number" placeholder="tól" value={minArea}
                  onChange={(e) => setMinArea(e.target.value)} className={styles.input} />
                <input type="number" placeholder="ig" value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)} className={styles.input} />
              </div>
            </FilterSection>

            <FilterSection title="Kategória">
              {[
                { value: 'small', label: 'Kis ház (–100 m²)' },
                { value: 'family', label: 'Családi ház (100–150 m²)' },
                { value: 'large', label: 'Nagy ház (150–200 m²)' },
                { value: 'villa', label: 'Villa (200 m² felett)' },
                { value: 'twostorey', label: 'Emeletes' },
              ].map((c) => (
                <CheckOption key={c.value} label={c.label}
                  checked={categories.includes(c.value)}
                  onChange={() => toggle(categories, setCategories, c.value)} />
              ))}
            </FilterSection>

            <FilterSection title="Árkategória">
              {[
                { value: 'budget', label: 'Gazdaságos' },
                { value: 'mid', label: 'Középkategória' },
                { value: 'premium', label: 'Prémium' },
                { value: 'luxury', label: 'Luxus' },
              ].map((c) => (
                <CheckOption key={c.value} label={c.label}
                  checked={priceCategories.includes(c.value)}
                  onChange={() => toggle(priceCategories, setPriceCategories, c.value)} />
              ))}
            </FilterSection>

            <FilterSection title="Stílus">
              {[
                { value: 'modern', label: 'Modern' },
                { value: 'classic', label: 'Klasszikus' },
                { value: 'mediterranean', label: 'Mediterrán' },
                { value: 'scandinavian', label: 'Skandináv' },
                { value: 'rustic', label: 'Rusztikus' },
              ].map((c) => (
                <CheckOption key={c.value} label={c.label}
                  checked={styleFilters.includes(c.value)}
                  onChange={() => toggle(styleFilters, setStyleFilters, c.value)} />
              ))}
            </FilterSection>

            <FilterSection title="Szobák / fürdők">
              <div className={styles.inputGroup}>
                <div>
                  <p className={styles.inputLabel}>Min. szobák</p>
                  <input type="number" placeholder="pl. 3" value={minRooms}
                    onChange={(e) => setMinRooms(e.target.value)} className={styles.input} />
                </div>
                <div>
                  <p className={styles.inputLabel}>Min. fürdők</p>
                  <input type="number" placeholder="pl. 2" value={minBathrooms}
                    onChange={(e) => setMinBathrooms(e.target.value)} className={styles.input} />
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Emeletek">
              <input type="number" placeholder="Min. szintek száma" value={minFloors}
                onChange={(e) => setMinFloors(e.target.value)} className={styles.input} />
            </FilterSection>

            <FilterSection title="Terasz (m²)">
              <input type="number" placeholder="Min. terasz méret" value={minTerrace}
                onChange={(e) => setMinTerrace(e.target.value)} className={styles.input} />
            </FilterSection>

            <FilterSection title="Tető típusa">
              {[
                { value: 'gable', label: 'Nyeregtető' },
                { value: 'hip', label: 'Sátortető' },
                { value: 'flat', label: 'Lapostető' },
                { value: 'hipped', label: 'Kontyolt tető' },
              ].map((c) => (
                <CheckOption key={c.value} label={c.label}
                  checked={roofTypes.includes(c.value)}
                  onChange={() => toggle(roofTypes, setRoofTypes, c.value)} />
              ))}
            </FilterSection>

            <FilterSection title="Falszerkezet">
              {[
                { value: 'brick', label: 'Tégla' },
                { value: 'poroton', label: 'Poroton' },
                { value: 'lightweight', label: 'Könnyűszerkezet' },
                { value: 'concrete', label: 'Beton' },
              ].map((c) => (
                <CheckOption key={c.value} label={c.label}
                  checked={wallStructures.includes(c.value)}
                  onChange={() => toggle(wallStructures, setWallStructures, c.value)} />
              ))}
            </FilterSection>

            <FilterSection title="Fűtés">
              {[
                { value: 'gas', label: 'Gáz' },
                { value: 'heat_pump', label: 'Hőszivattyú' },
                { value: 'electric', label: 'Elektromos' },
                { value: 'wood', label: 'Fa / Pellet' },
                { value: 'solar', label: 'Napkollektor' },
              ].map((c) => (
                <CheckOption key={c.value} label={c.label}
                  checked={heatings.includes(c.value)}
                  onChange={() => toggle(heatings, setHeatings, c.value)} />
              ))}
            </FilterSection>

            <FilterSection title="Hűtés">
              {[
                { value: 'ac', label: 'Klíma' },
                { value: 'heat_pump', label: 'Hőszivattyú' },
                { value: 'natural', label: 'Természetes szellőzés' },
                { value: 'none', label: 'Nincs' },
              ].map((c) => (
                <CheckOption key={c.value} label={c.label}
                  checked={coolings.includes(c.value)}
                  onChange={() => toggle(coolings, setCoolings, c.value)} />
              ))}
            </FilterSection>

            <FilterSection title="Energetika">
              {['AA++', 'AA+', 'AA', 'A+', 'A', 'B', 'C'].map((v) => (
                <CheckOption key={v} label={v}
                  checked={energyRatings.includes(v)}
                  onChange={() => toggle(energyRatings, setEnergyRatings, v)} />
              ))}
            </FilterSection>

            <FilterSection title="Extra">
              <CheckOption label="Csak kiemelt házak" checked={onlyFeatured} onChange={setOnlyFeatured} />
              <CheckOption label="Szülői fürdő" checked={onlyMasterBath} onChange={setOnlyMasterBath} />
              <CheckOption label="Gardrób" checked={onlyWardrobe} onChange={setOnlyWardrobe} />
              <CheckOption label="Kémény" checked={onlyChimney} onChange={setOnlyChimney} />
            </FilterSection>
          </div>
        </aside>

        {/* ── LISTA ── */}
        <main className={styles.main}>
          <p className={styles.resultCount}>{filtered.length} találat</p>

          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🏠</div>
              <p>Nincs a szűrőnek megfelelő ház.</p>
              <button className={styles.emptyResetBtn} onClick={resetAll}>
                Szűrők törlése
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((house) => (
                <Link key={house.id} href={`/hazak/${house.slug}`} className={styles.card}>
                  <div className={styles.cardImage}>
                    <span className={styles.cardImageLabel}>Látványterv</span>
                    {house.featured && (
                      <span className={styles.cardBadge}>Kiemelt</span>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{house.name}</h2>
                    {house.shortDescription && (
                      <p className={styles.cardDesc}>{house.shortDescription}</p>
                    )}
                    <div className={styles.cardStats}>
                      {[
                        { value: `${house.area} m²`, label: 'Alapterület' },
                        { value: `${house.rooms} szoba`, label: 'Szoba' },
                        { value: `${house.floors} szint`, label: 'Szint' },
                      ].map((s) => (
                        <div key={s.label} className={styles.cardStat}>
                          <div className={styles.cardStatValue}>{s.value}</div>
                          <div className={styles.cardStatLabel}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cardFooter}>
                      {house.priceFrom ? (
                        <span className={styles.cardPrice}>
                          {formatPrice(house.priceFrom)}-tól
                        </span>
                      ) : <span />}
                      <span className={styles.cardLink}>Részletek →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
