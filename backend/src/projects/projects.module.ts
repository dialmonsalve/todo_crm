import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectTranslationHandler } from './translation/project-translation.handler';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectTranslationHandler],
})
export class ProjectsModule {}
