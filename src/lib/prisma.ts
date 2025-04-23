import { PrismaClient } from "../../generated/prisma"
import { withAccelerate } from '@prisma/extension-accelerate'

/**
 * Opens a Prisma Client and attaches it to the global object.
 */
const prisma = new PrismaClient().$extends(withAccelerate())

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma