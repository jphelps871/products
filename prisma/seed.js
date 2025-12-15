import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const defaultCategories = ["UI", "UX", "Enhancement", "Bug", "Feature"];

  await prisma.category.createMany({
    data: defaultCategories.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const defaultStatus = ["Planned", "In-Progress", "Live"];
  await prisma.status.createMany({
    data: defaultStatus.map((name) => ({ name })),
    skipDuplicates: true,
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
