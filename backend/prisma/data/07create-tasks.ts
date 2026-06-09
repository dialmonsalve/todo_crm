import { type PrismaClient } from '@generated-prisma/client';

export async function createTasks(prisma: PrismaClient) {
  console.log('🌱 Creating Tasks...');

  const projects = await prisma.project.findMany();
  const users = await prisma.user.findMany();

  if (projects.length === 0 || users.length === 0) {
    throw new Error('⚠️ No projects or users found. Skip tasks creation.');
  }

  const targetProject = projects[0];
  const defaultUser = users[0];

  const structuralDueDate = new Date();
  structuralDueDate.setDate(structuralDueDate.getDate() + 7);

  const tasksData = [
    {
      title: 'Configurar arquitectura base',
      description:
        'Inicializar repositorio, NestJS con Prisma y estructurar variables de entorno.',
    },
    {
      title: 'Diseñar base de datos y migraciones',
      description:
        'Modelar las tablas de clientes, proyectos y flujos de autenticación.',
    },
    {
      title: 'Implementar Interceptor de Refresh Token',
      description:
        'Desarrollar la rotación silenciosa de JWT en caliente en base a la expiración.',
    },
    {
      title: 'Maquetación de Login en Astro',
      description:
        'Crear la interfaz de usuario limpia conectada a los endpoints del backend.',
    },
  ];

  for (const task of tasksData) {
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        dueDate: structuralDueDate,
        project: {
          connect: { id: targetProject.id },
        },
        createdBy: {
          connect: { id: defaultUser.id },
        },
        assignee: {
          connect: { id: defaultUser.id },
        },
      },
    });
  }

  console.log('✅ Tasks created successfully');
}
