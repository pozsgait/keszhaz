import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HazakClient } from './HazakClient'

export const metadata = {
  title: 'Készházak',
  description: 'Válasszon kész háztípusaink közül',
}

export default async function HazakPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: houses } = await payload.find({
    collection: 'houses',
    limit: 100,
    where: {
      status: { equals: 'active' },
    },
    sort: '-createdAt',
  })

  return <HazakClient houses={houses} />
}