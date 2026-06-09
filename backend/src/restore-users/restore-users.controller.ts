import { Controller, Patch, Param } from '@nestjs/common';
import { RestoreUsersService } from './restore-users.service';

@Controller('restore-users')
export class RestoreUsersController {
  constructor(private readonly restoreUsersService: RestoreUsersService) {}

  @Patch()
  findAll() {
    return this.restoreUsersService.emergencyAppShutdown();
  }

  @Patch(':userId')
  revokeUserSessions(@Param('userId') userId: string) {
    return this.restoreUsersService.revokeUserSessions(userId);
  }
}
