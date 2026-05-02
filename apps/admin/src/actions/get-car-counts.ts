import prisma from '@/lib/prisma'

export const getTotalCars = async () => {
   return await prisma.car.count({
      where: {
         isDeleted: false,
      },
   })
}

export const getAvailableCars = async () => {
   return await prisma.car.count({
      where: {
         isDeleted: false,
         isAvailable: true,
      },
   })
}

export const getSoldCars = async () => {
   return await prisma.car.count({
      where: {
         isDeleted: false,
         isAvailable: false,
      },
   })
}