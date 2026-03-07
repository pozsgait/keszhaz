import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RolunkPage } from './RolunkPage'

export const metadata = { title: 'Rólunk' }

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'rolunk', depth: 2 })
  return <RolunkPage data={data} />
}
