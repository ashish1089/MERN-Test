// import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.findMany({ take: 20 });
}

main().catch((e) => {
  console.log(e);
});
