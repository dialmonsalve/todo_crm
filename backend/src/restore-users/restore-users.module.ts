import { Module } from '@nestjs/common';
import { RestoreUsersService } from './restore-users.service';
import { RestoreUsersController } from './restore-users.controller';

@Module({
  controllers: [RestoreUsersController],
  providers: [RestoreUsersService],
})
export class RestoreUsersModule {}
