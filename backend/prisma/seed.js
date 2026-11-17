import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database (MongoDB)...');

  // Criar setores padrão
  const sectorAdmin = await prisma.sector.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' },
  });

  await prisma.sector.upsert({
    where: { name: 'TI' },
    update: {},
    create: { name: 'TI' },
  });

  await prisma.sector.upsert({
    where: { name: 'Financeiro' },
    update: {},
    create: { name: 'Financeiro' },
  });

  await prisma.sector.upsert({
    where: { name: 'Comercial' },
    update: {},
    create: { name: 'Comercial' },
  });

  // Criar perfis padrão
  // Como profile não tem name @unique no schema, buscamos pelo nome ou criamos
  let profileSupervisor = await prisma.profile.findFirst({
    where: { name: 'Supervisor do Sistema' },
  });
  if (!profileSupervisor) {
    profileSupervisor = await prisma.profile.create({
      data: { name: 'Supervisor do Sistema' },
    });
  }

  const profilesToEnsure = [
    'Técnico de Segurança',
    'Gestor de Contas',
    'Consultor Comercial',
  ];

  for (const profName of profilesToEnsure) {
    const existing = await prisma.profile.findFirst({ where: { name: profName } });
    if (!existing) {
      await prisma.profile.create({ data: { name: profName } });
    }
  }

  // Criar usuário administrador padrão para acesso inicial
  const hashPassword = await bcrypt.hash('12345', 10);
  await prisma.user.upsert({
    where: { email: 'admin@scap.com' },
    update: {
      password: hashPassword,
      sectorId: sectorAdmin.id,
      profileId: profileSupervisor.id,
    },
    create: {
      name: 'Administrador',
      email: 'admin@scap.com',
      password: hashPassword,
      profileId: profileSupervisor.id,
      sectorId: sectorAdmin.id,
    },
  });

  console.log('Database seeded successfully on MongoDB!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
