const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Technology" },
      update: {},
      create: { name: "Technology" },
    }),
    prisma.category.upsert({
      where: { name: "Lifestyle" },
      update: {},
      create: { name: "Lifestyle" },
    }),
    prisma.category.upsert({
      where: { name: "Business" },
      update: {},
      create: { name: "Business" },
    }),
    prisma.category.upsert({
      where: { name: "Health" },
      update: {},
      create: { name: "Health" },
    }),
  ])

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: "JavaScript" },
      update: {},
      create: { name: "JavaScript" },
    }),
    prisma.tag.upsert({
      where: { name: "React" },
      update: {},
      create: { name: "React" },
    }),
    prisma.tag.upsert({
      where: { name: "Next.js" },
      update: {},
      create: { name: "Next.js" },
    }),
    prisma.tag.upsert({
      where: { name: "Web Development" },
      update: {},
      create: { name: "Web Development" },
    }),
    prisma.tag.upsert({
      where: { name: "Tutorial" },
      update: {},
      create: { name: "Tutorial" },
    }),
    prisma.tag.upsert({
      where: { name: "Tips" },
      update: {},
      create: { name: "Tips" },
    }),
  ])

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      username: "admin",
      password: hashedPassword,
    },
  })

  console.log("Database seeded successfully!")
  console.log("Admin user created:")
  console.log("Email: admin@example.com")
  console.log("Password: admin123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
