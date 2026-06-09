import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { ClassSerializerInterceptor } from '@nestjs/common';

import { I18nValidationPipe, I18nValidationExceptionFilter } from 'nestjs-i18n';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

import { envs } from './config/envs';
import { logger } from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.useGlobalFilters(
    new PrismaClientExceptionFilter(),
    new I18nValidationExceptionFilter({ detailedErrors: false })
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    origin: envs.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(envs.PORT);
}

bootstrap().catch((e) => console.log(e));
