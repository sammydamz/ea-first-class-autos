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
    update: {
      defaultWhatsApp: '+233501234567',
      businessName: 'E.A. First Class Autos',
      businessEmail: 'info@eafirstclassautos.com',
      businessAddress: 'Accra, Ghana',
    },
    create: {
      id: 'default',
      businessName: 'E.A. First Class Autos',
      defaultWhatsApp: '+233501234567',
      businessEmail: 'info@eafirstclassautos.com',
      businessAddress: 'Accra, Ghana',
    },
  })

  console.log('Created default site config')

  const brands = await prisma.brand.findMany()

  const sampleCars = [
    {
      title: 'Toyota Camry 2022',
      slug: 'toyota-camry-2022',
      model: 'Camry',
      year: 2022,
      price: 25000,
      isNegotiable: true,
      condition: 'Local Used',
      description: 'Well maintained sedan with low mileage. Single owner, full service history.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Toyota')!.id,
    },
    {
      title: 'BMW X5 2023',
      slug: 'bmw-x5-2023',
      model: 'X5',
      year: 2023,
      price: 55000,
      isNegotiable: false,
      condition: 'Brand New',
      description: 'Luxury SUV with premium features. M Sport package, panoramic roof.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'BMW')!.id,
    },
    {
      title: 'Honda Civic 2021',
      slug: 'honda-civic-2021',
      model: 'Civic',
      year: 2021,
      price: 18000,
      isNegotiable: true,
      condition: 'Local Used',
      description: 'Reliable and fuel-efficient compact car. Great condition.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Honda')!.id,
    },
    {
      title: 'Mercedes-Benz C-Class 2023',
      slug: 'mercedes-c-class-2023',
      model: 'C-Class',
      year: 2023,
      price: 48000,
      isNegotiable: false,
      condition: 'Foreign Used',
      description: 'Elegant sedan with advanced technology. AMG Line exterior.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Mercedes-Benz')!.id,
    },
    {
      title: 'Ford F-150 2022',
      slug: 'ford-f150-2022',
      model: 'F-150',
      year: 2022,
      price: 35000,
      isNegotiable: true,
      condition: 'Foreign Used',
      description: 'Powerful truck ready for any job. Extended cab, 4WD.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Ford')!.id,
    },
    {
      title: 'Toyota RAV4 2023',
      slug: 'toyota-rav4-2023',
      model: 'RAV4',
      year: 2023,
      price: 32000,
      isNegotiable: true,
      condition: 'Brand New',
      description: 'Versatile crossover SUV. Hybrid engine available.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Toyota')!.id,
    },
    {
      title: 'Honda CR-V 2022',
      slug: 'honda-cr-v-2022',
      model: 'CR-V',
      year: 2022,
      price: 28000,
      isNegotiable: true,
      condition: 'Local Used',
      description: 'Spacious and comfortable SUV. Perfect family car.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Honda')!.id,
    },
    {
      title: 'BMW 3 Series 2023',
      slug: 'bmw-3-series-2023',
      model: '3 Series',
      year: 2023,
      price: 42000,
      isNegotiable: false,
      condition: 'Brand New',
      description: 'The ultimate driving machine. Sport suspension, leather interior.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'BMW')!.id,
    },
    {
      title: 'Mercedes-Benz GLE 2022',
      slug: 'mercedes-gle-2022',
      model: 'GLE',
      year: 2022,
      price: 62000,
      isNegotiable: true,
      condition: 'Foreign Used',
      description: 'Premium luxury SUV. Burmester sound system, ambient lighting.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Mercedes-Benz')!.id,
    },
    {
      title: 'Ford Mustang 2023',
      slug: 'ford-mustang-2023',
      model: 'Mustang',
      year: 2023,
      price: 38000,
      isNegotiable: false,
      condition: 'Brand New',
      description: 'Iconic American muscle car. GT Performance Package.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Ford')!.id,
    },
    {
      title: 'Toyota Corolla 2021',
      slug: 'toyota-corolla-2021',
      model: 'Corolla',
      year: 2021,
      price: 16000,
      isNegotiable: true,
      condition: 'Local Used',
      description: 'Compact and efficient. Perfect for daily commuting.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Toyota')!.id,
    },
    {
      title: 'Honda Accord 2022',
      slug: 'honda-accord-2022',
      model: 'Accord',
      year: 2022,
      price: 27000,
      isNegotiable: true,
      condition: 'Foreign Used',
      description: 'Midsize sedan with excellent reliability. Touring trim.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Honda')!.id,
    },
    {
      title: 'BMW X3 2023',
      slug: 'bmw-x3-2023',
      model: 'X3',
      year: 2023,
      price: 46000,
      isNegotiable: false,
      condition: 'Brand New',
      description: 'Compact luxury SUV. xDrive, premium package.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'BMW')!.id,
    },
    {
      title: 'Ford Explorer 2022',
      slug: 'ford-explorer-2022',
      model: 'Explorer',
      year: 2022,
      price: 36000,
      isNegotiable: true,
      condition: 'Foreign Used',
      description: 'Three-row SUV with plenty of space for the whole family.',
      images: ['/placeholder-car.svg'],
      brandId: brands.find((b) => b.title === 'Ford')!.id,
    },
  ]

  for (const carData of sampleCars) {
    await prisma.car.upsert({
      where: { slug: carData.slug },
      update: {},
      create: carData,
    })
  }

  console.log(`Created ${sampleCars.length} sample cars`)
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
