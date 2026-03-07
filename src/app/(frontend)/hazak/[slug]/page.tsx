import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { HazDetail } from './HazDetail'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'houses',
    limit: 100,
    select: { slug: true },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'houses',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const house = docs[0]
  if (!house) return {}
  return {
    title: `${house.name} | Készházak`,
    description: house.shortDescription,
  }
}

export default async function HazPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'houses',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const house = docs[0]
  if (!house) notFound()

  return <HazDetail house={house} />
}