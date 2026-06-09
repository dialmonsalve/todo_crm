import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { ProfileModule } from 'src/profile/profile.module';
import { UserRepository } from './repository/user-repository';
import { UserTranslationHandler } from './translation/user-translation.handler';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UserTranslationHandler,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  imports: [ProfileModule],
})
export class UsersModule {}
