import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Criar setores padrão
  await prisma.sector.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { id: 1, name: 'Admin' },
  });

  await prisma.sector.upsert({
    where: { name: 'TI' },
    update: {},
    create: { id: 2, name: 'TI' },
  });

  await prisma.sector.upsert({
    where: { name: 'Financeiro' },
    update: {},
    create: { id: 3, name: 'Financeiro' },
  });

  await prisma.sector.upsert({
    where: { name: 'Comercial' },
    update: {},
    create: { id: 4, name: 'Comercial' },
  });

  // Criar perfis padrão
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'Supervisor do Sistema' },
  });

  await prisma.profile.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Técnico de Segurança' },
  });

  await prisma.profile.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, name: 'Gestor de Contas' },
  });

  await prisma.profile.upsert({
    where: { id: 4 },
    update: {},
    create: { id: 4, name: 'Consultor Comercial' },
  });

  // Criar usuário administrador padrão para acesso inicial
  const hashPassword = await bcrypt.hash('12345', 10);
  await prisma.user.upsert({
    where: { email: 'admin@scap.com' },
    update: {},
    create: {
      id: 1,
      name: 'Administrador',
      email: 'admin@scap.com',
      password: hashPassword,
      profileId: 1,
      sectorId: 1
    }
  });

  // Ajustar sequenciadores do PostgreSQL devido aos IDs manuais
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"tb_sector"', 'id'), coalesce(max(id), 1)) FROM "tb_sector"`);
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"tb_profile"', 'id'), coalesce(max(id), 1)) FROM "tb_profile"`);
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"tb_user"', 'id'), coalesce(max(id), 1)) FROM "tb_user"`);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
