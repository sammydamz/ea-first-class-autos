import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@firstclassautos.com' },
    update: {},
    create: {
      email: 'admin@firstclassautos.com',
      passwordHash: '$2a$10$dummyhashfortestingonly1234567890abcdefghijklmnop',
      name: 'Admin User',
    },
  })
  console.log('Created admin:', admin.email)

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Latest gadgets, phones, tablets, and accessories',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      type: 'STANDARD',
      isActive: true,
      position: 1,
      adminId: admin.id,
    },
  })

  const homeAppliances = await prisma.category.create({
    data: {
      name: 'Home Appliances',
      slug: 'home-appliances',
      description: 'Kitchen appliances, home electronics, and household essentials',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      type: 'STANDARD',
      isActive: true,
      position: 2,
      adminId: admin.id,
    },
  })

  const clothingFabrics = await prisma.category.create({
    data: {
      name: 'Clothing & Fabrics',
      slug: 'clothing-fabrics',
      description: 'Quality clothing, fabrics, and fashion items',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      type: 'VARIANT',
      isActive: true,
      position: 3,
      adminId: admin.id,
    },
  })
  console.log('Created categories')

  // Create suppliers for Electronics
  const electronicsSuppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        name: 'TechZone Ghana',
        phone: '+233 20 123 4567',
        email: 'info@techzone.com.gh',
        address: 'Accra Mall, Accra',
        adminId: admin.id,
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Ghana Electronics Hub',
        phone: '+233 30 234 5678',
        email: 'sales@gehub.com.gh',
        address: 'Kumasi Central Market, Kumasi',
        adminId: admin.id,
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Accra Gadgets Plus',
        phone: '+233 50 345 6789',
        email: 'contact@aggplus.com.gh',
        address: 'Osu, Accra',
        adminId: admin.id,
      },
    }),
  ])
  console.log('Created electronics suppliers')

  // Create suppliers for Home Appliances
  const homeSuppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        name: 'Home Essentials Ghana',
        phone: '+233 24 456 7890',
        email: 'orders@homeessentials.com.gh',
        address: 'Takoradi, Western Region',
        adminId: admin.id,
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Kitchen Masters Ghana',
        phone: '+233 32 567 8901',
        email: 'info@kitchenmasters.com.gh',
        address: 'Tema, Greater Accra',
        adminId: admin.id,
      },
    }),
  ])
  console.log('Created home appliances suppliers')

  // Create suppliers for Clothing
  const clothingSuppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        name: 'Textile Connect Ghana',
        phone: '+233 20 678 9012',
        email: 'bulk@textileconnect.com.gh',
        address: 'Kumasi, Ashanti Region',
        adminId: admin.id,
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Fashion Forward Ghana',
        phone: '+233 26 789 0123',
        email: 'sales@fashionforward.com.gh',
        address: 'Accra Central',
        adminId: admin.id,
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Premium Fabrics Ltd',
        phone: '+233 28 890 1234',
        email: 'info@premiumfabrics.com.gh',
        address: 'Cape Coast, Central Region',
        adminId: admin.id,
      },
    }),
  ])
  console.log('Created clothing suppliers')

  // Create Electronics products
  const electronicsProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Samsung Galaxy A15',
        slug: 'samsung-galaxy-a15',
        brand: 'Samsung',
        description: '6.5" display, 128GB storage, 50MP camera, 5000mAh battery. Perfect for everyday use with excellent camera quality.',
        price: 3499,
        stock: 25,
        isActive: true,
        supplierId: electronicsSuppliers[0].id,
        categoryId: electronics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', position: 1 },
            { url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800', position: 2 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Black', extraPrice: 0, stock: 25 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'iPhone 13 Refurbished',
        slug: 'iphone-13-refurbished',
        brand: 'Apple',
        description: 'Certified refurbished iPhone 13, 128GB, excellent condition with 6-month warranty.',
        price: 5999,
        stock: 12,
        isActive: true,
        supplierId: electronicsSuppliers[1].id,
        categoryId: electronics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Midnight Blue', extraPrice: 0, stock: 12 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Tecno Spark 10C',
        slug: 'tecno-spark-10c',
        brand: 'Tecno',
        description: '6.6" HD+ display, 64GB storage, 5000mAh battery, side fingerprint. Budget-friendly smartphone.',
        price: 1499,
        stock: 40,
        isActive: true,
        supplierId: electronicsSuppliers[2].id,
        categoryId: electronics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Ocean Blue', extraPrice: 0, stock: 40 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Infinix Hot 30i',
        slug: 'infinix-hot-30i',
        brand: 'Infinix',
        description: '6.6" display, 128GB, 50MP main camera, 5000mAh battery. Great value for money.',
        price: 1799,
        stock: 35,
        isActive: true,
        supplierId: electronicsSuppliers[0].id,
        categoryId: electronics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Diamond White', extraPrice: 0, stock: 35 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'JBL Flip 6 Speaker',
        slug: 'jbl-flip-6-speaker',
        brand: 'JBL',
        description: 'Portable Bluetooth speaker with powerful bass, 12 hours battery life, waterproof design.',
        price: 899,
        stock: 30,
        isActive: true,
        supplierId: electronicsSuppliers[1].id,
        categoryId: electronics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Black', extraPrice: 0, stock: 30 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sony WH-1000XM5 Headphones',
        slug: 'sony-wh-1000xm5',
        brand: 'Sony',
        description: 'Premium noise-canceling headphones, 30-hour battery, multipoint connection.',
        price: 3499,
        stock: 15,
        isActive: true,
        supplierId: electronicsSuppliers[2].id,
        categoryId: electronics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Silver', extraPrice: 0, stock: 15 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Samsung Galaxy Tab A8',
        slug: 'samsung-galaxy-tab-a8',
        brand: 'Samsung',
        description: '10.5" tablet, 64GB storage, perfect for entertainment and light work.',
        price: 2499,
        stock: 20,
        isActive: true,
        supplierId: electronicsSuppliers[0].id,
        categoryId: electronics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Gray', extraPrice: 0, stock: 20 }],
        },
      },
    }),
  ])
  console.log('Created electronics products')

  // Create Home Appliances products
  const homeProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Hisense 50" Smart TV',
        slug: 'hisense-50-smart-tv',
        brand: 'Hisense',
        description: '50" Full HD Smart TV, built-in WiFi, Netflix, YouTube pre-installed. Crystal clear picture quality.',
        price: 4999,
        stock: 10,
        isActive: true,
        supplierId: homeSuppliers[0].id,
        categoryId: homeAppliances.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Black', extraPrice: 0, stock: 10 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'LG 1.5 Ton AC',
        slug: 'lg-1-5-ton-ac',
        brand: 'LG',
        description: '1.5 Ton split AC, inverter technology, energy efficient, cool and comfortable.',
        price: 7999,
        stock: 8,
        isActive: true,
        supplierId: homeSuppliers[1].id,
        categoryId: homeAppliances.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1631545806609-28b573d1bc5b?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'White', extraPrice: 0, stock: 8 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Samsung 8kg Washing Machine',
        slug: 'samsung-8kg-washing-machine',
        brand: 'Samsung',
        description: '8kg front load washing machine, multiple wash programs, eco-friendly.',
        price: 5499,
        stock: 12,
        isActive: true,
        supplierId: homeSuppliers[0].id,
        categoryId: homeAppliances.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Silver', extraPrice: 0, stock: 12 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Scanfrost 3-Door Fridge',
        slug: 'scanfrost-3-door-fridge',
        brand: 'Scanfrost',
        description: '450L side-by-side refrigerator, no-frost, energy efficient, built-in ice maker.',
        price: 6999,
        stock: 6,
        isActive: true,
        supplierId: homeSuppliers[1].id,
        categoryId: homeAppliances.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Stainless Steel', extraPrice: 0, stock: 6 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Microwave Oven 30L',
        slug: 'microwave-oven-30l',
        brand: 'Panasonic',
        description: '30L microwave oven, multiple power levels, defrost function, timer.',
        price: 1299,
        stock: 25,
        isActive: true,
        supplierId: homeSuppliers[0].id,
        categoryId: homeAppliances.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'White', extraPrice: 0, stock: 25 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Electric Kettle 1.8L',
        slug: 'electric-kettle-1-8l',
        brand: 'Midea',
        description: '1.8L electric kettle, fast boil, auto shut-off, stainless steel body.',
        price: 399,
        stock: 50,
        isActive: true,
        supplierId: homeSuppliers[1].id,
        categoryId: homeAppliances.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'Silver', extraPrice: 0, stock: 50 }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Standing Fan 18"',
        slug: 'standing-fan-18',
        brand: 'Nikano',
        description: '18" oscillating standing fan, 3 speeds, remote control, quiet operation.',
        price: 599,
        stock: 35,
        isActive: true,
        supplierId: homeSuppliers[0].id,
        categoryId: homeAppliances.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800', position: 1 },
          ],
        },
        variants: {
          create: [{ size: 'Default', color: 'White', extraPrice: 0, stock: 35 }],
        },
      },
    }),
  ])
  console.log('Created home appliances products')

  // Create Clothing products with variants
  const clothingProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'African Print Dress',
        slug: 'african-print-dress',
        brand: 'Ankara Queen',
        description: 'Beautiful handcrafted African print dress, vibrant colors, perfect for special occasions.',
        price: 899,
        stock: 20,
        isActive: true,
        supplierId: clothingSuppliers[0].id,
        categoryId: clothingFabrics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', position: 1 },
            { url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800', position: 2 },
          ],
        },
        variants: {
          create: [
            { size: 'S', color: 'Blue Print', extraPrice: 0, stock: 5 },
            { size: 'M', color: 'Blue Print', extraPrice: 0, stock: 5 },
            { size: 'L', color: 'Blue Print', extraPrice: 0, stock: 5 },
            { size: 'XL', color: 'Blue Print', extraPrice: 0, stock: 5 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Men\'s Kente Shirt',
        slug: 'mens-kente-shirt',
        brand: 'Kente Kings',
        description: 'Premium quality Kente patterned shirt, comfortable cotton blend, traditional yet modern.',
        price: 699,
        stock: 25,
        isActive: true,
        supplierId: clothingSuppliers[1].id,
        categoryId: clothingFabrics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800', position: 1 },
          ],
        },
        variants: {
          create: [
            { size: 'S', color: 'Gold/Yellow', extraPrice: 0, stock: 5 },
            { size: 'M', color: 'Gold/Yellow', extraPrice: 0, stock: 6 },
            { size: 'L', color: 'Gold/Yellow', extraPrice: 0, stock: 7 },
            { size: 'XL', color: 'Gold/Yellow', extraPrice: 0, stock: 4 },
            { size: 'XXL', color: 'Gold/Yellow', extraPrice: 0, stock: 3 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Women\'s Palazzo Pants',
        slug: 'womens-palazzo-pants',
        brand: ' Faso Mode',
        description: 'Elegant wide-leg palazzo pants, high waist, flowy fit. Perfect for office and casual wear.',
        price: 499,
        stock: 30,
        isActive: true,
        supplierId: clothingSuppliers[2].id,
        categoryId: clothingFabrics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', position: 1 },
          ],
        },
        variants: {
          create: [
            { size: 'S', color: 'Black', extraPrice: 0, stock: 8 },
            { size: 'M', color: 'Black', extraPrice: 0, stock: 8 },
            { size: 'L', color: 'Black', extraPrice: 0, stock: 7 },
            { size: 'XL', color: 'Black', extraPrice: 0, stock: 7 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'African Wax Fabric (6 Yards)',
        slug: 'african-wax-fabric',
        brand: 'Vlisco',
        description: 'Premium quality African wax print fabric, 6 yards per piece, vibrant colors that last.',
        price: 799,
        stock: 40,
        isActive: true,
        supplierId: clothingSuppliers[0].id,
        categoryId: clothingFabrics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', position: 1 },
          ],
        },
        variants: {
          create: [
            { size: '6 Yards', color: 'Red/Orange', extraPrice: 0, stock: 10 },
            { size: '6 Yards', color: 'Blue/Green', extraPrice: 0, stock: 10 },
            { size: '6 Yards', color: 'Purple/Pink', extraPrice: 0, stock: 10 },
            { size: '6 Yards', color: 'Yellow/Gold', extraPrice: 0, stock: 10 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Men\'s Agbada Outfit',
        slug: 'mens-agbada-outfit',
        brand: 'Royal Wears',
        description: 'Traditional Agbada outfit, complete with shirt and hat, for special occasions.',
        price: 1499,
        stock: 15,
        isActive: true,
        supplierId: clothingSuppliers[1].id,
        categoryId: clothingFabrics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', position: 1 },
          ],
        },
        variants: {
          create: [
            { size: 'M', color: 'White', extraPrice: 0, stock: 3 },
            { size: 'L', color: 'White', extraPrice: 0, stock: 4 },
            { size: 'XL', color: 'White', extraPrice: 0, stock: 4 },
            { size: 'XXL', color: 'White', extraPrice: 0, stock: 4 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Women\'s Head Tie (Gele)',
        slug: 'womens-head-tie',
        brand: 'Scarf World',
        description: 'Premium quality head tie (Gele), large size for various styles, smooth finish.',
        price: 249,
        stock: 60,
        isActive: true,
        supplierId: clothingSuppliers[2].id,
        categoryId: clothingFabrics.id,
        adminId: admin.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800', position: 1 },
          ],
        },
        variants: {
          create: [
            { size: 'One Size', color: 'Multi-Pattern 1', extraPrice: 0, stock: 15 },
            { size: 'One Size', color: 'Multi-Pattern 2', extraPrice: 0, stock: 15 },
            { size: 'One Size', color: 'Solid Blue', extraPrice: 0, stock: 15 },
            { size: 'One Size', color: 'Solid Red', extraPrice: 0, stock: 15 },
          ],
        },
      },
    }),
  ])
  console.log('Created clothing products')

  // Create banners
  const banners = await Promise.all([
    prisma.banner.create({
      data: {
        title: 'Summer Sale - Up to 30% Off',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
        description: 'Shop the best deals on electronics, home appliances, and fashion',
        link: '/products',
        isActive: true,
        position: 1,
      },
    }),
    prisma.banner.create({
      data: {
        title: 'New Arrivals - Fashion Collection',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
        description: 'Discover the latest African prints and contemporary fashion',
        link: '/category/clothing-fabrics',
        isActive: true,
        position: 2,
      },
    }),
    prisma.banner.create({
      data: {
        title: 'Free Delivery on Orders Over ₵500',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
        description: 'Shop now and enjoy free delivery across Ghana',
        link: '/products',
        isActive: true,
        position: 3,
      },
    }),
  ])
  console.log('Created banners')

  // Create site config
  const siteConfigs = await Promise.all([
    prisma.siteConfig.upsert({
      where: { key: 'businessName' },
      update: {},
      create: { key: 'businessName', value: 'First Class Autos & Electronics' },
    }),
    prisma.siteConfig.upsert({
      where: { key: 'businessPhone' },
      update: {},
      create: { key: 'businessPhone', value: '+233 50 123 4567' },
    }),
    prisma.siteConfig.upsert({
      where: { key: 'businessEmail' },
      update: {},
      create: { key: 'businessEmail', value: 'info@firstclassautos.com' },
    }),
    prisma.siteConfig.upsert({
      where: { key: 'businessAddress' },
      update: {},
      create: { key: 'businessAddress', value: 'Accra, Ghana' },
    }),
    prisma.siteConfig.upsert({
      where: { key: 'whatsappNumber' },
      update: {},
      create: { key: 'whatsappNumber', value: '+233 20 123 4567' },
    }),
  ])
  console.log('Created site config')

  console.log('Seed completed successfully!')
  console.log(`Summary:
    - 1 Admin
    - 3 Categories
    - 8 Suppliers (3 electronics, 2 home, 3 clothing)
    - ${electronicsProducts.length} Electronics products
    - ${homeProducts.length} Home Appliances products
    - ${clothingProducts.length} Clothing products
    - ${banners.length} Banners
    - ${siteConfigs.length} Site Config entries`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })