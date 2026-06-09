import { type PrismaClient } from '@generated-prisma/client';

export async function createProjects(prisma: PrismaClient) {
  console.log('🌱 Creating Projects');

  const customers = await prisma.customer.findMany();

  if (customers.length === 0) {
    throw new Error('⚠️ No customers found. Skip projects creation.');
  }

  const projectsData = [
    {
      name: 'Desarrollo de Landing Page',
      description: 'Optimización de sitio web y posicionamiento SEO básico.',
      customerId: customers[0].id,
    },
    {
      name: 'E-commerce Platform',
      description: 'Tienda en línea con pasarela de pagos integrada.',
      customerId: customers[1].id,
    },
    {
      name: 'Sistema de Inventario Backend',
      description: 'API centralizada para control de stock en tiempo real.',
      customerId: customers[2].id,
    },
    {
      name: 'Rediseño de App Móvil',
      description:
        'Mejora de UX/UI para la aplicación nativa de iOS y Android.',
      customerId: customers[3].id,
    },
    {
      name: 'Mantenimiento Cloud mensual',
      description: 'Soporte, backups y monitoreo de infraestructura en AWS.',
      customerId: customers[4].id,
    },
    {
      name: 'Portal de Clientes (CRM)',
      description: 'Fase inicial de requerimientos e histórico de tareas.',
      customerId: customers[5].id,
    },
  ];

  for (const project of projectsData) {
    await prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
        client: {
          connect: { id: project.customerId },
        },
      },
    });
  }

  console.log('✅ Projects created successfully');
}
