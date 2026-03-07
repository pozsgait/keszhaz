import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { KapcsolatPage } from './KapcsolatPage'

export const metadata = { title: 'Kapcsolat' }

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'kapcsolat', depth: 1 })
  return <KapcsolatPage data={data} />
}
