import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ReferenciakPage } from './ReferenciakPage'

export const metadata = { title: 'Referenciák' }

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'referenciak', depth: 2 })
  return <ReferenciakPage data={data} />
}
