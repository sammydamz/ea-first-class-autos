import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const name = process.env.ADMIN_NAME || 'Admin'

  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name,
    },
  })

  console.log(`Created admin: ${admin.email}`)

   const defaultBrands = [
    { title: 'Toyota', description: 'Toyota Motor Corporation' },
    { title: 'Honda', description: 'Honda Motor Co.' },
    { title: 'BMW', description: 'Bayerische Motoren Werke' },
    { title: 'Mercedes-Benz', description: 'Mercedes-Benz Group' },
    { title: 'Ford', description: 'Ford Motor Company' },
  ]

  for (const brand of defaultBrands) {
    await prisma.brand.upsert({
      where: { title: brand.title },
      update: {},
      create: brand,
    })
  }

  console.log(`Created ${defaultBrands.length} default brands`)

  await prisma.siteConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      businessName: 'EA First Class Autos',
    },
  })

  console.log('Created default site config')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })