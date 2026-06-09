import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Req,
  Query,
  Patch,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '@aDecorators/auth.decorator';
import { Role } from '@generated-prisma/enums';

import type { PaginatedResult } from '@cPaginate/interface';
import type { IUserRequest, IUserResponseDto } from './interfaces';
import type { ApiResponse } from '@cInterfaces/api-response.interface';

@Controller('users')
@Auth([Role.MANAGER])
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
    @Req()
    req: IUserRequest
  ): Promise<ApiResponse> {
    return this.usersService.create(createUserDto, req.user.id);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationUserDto
  ): Promise<PaginatedResult<IUserResponseDto>> {
    return this.usersService.findAll(paginationDto);
  }

  @Get('user/:username')
  findByUsername(
    @Param('username')
    username: string
  ): Promise<IUserResponseDto> {
    return this.usersService.findByUsername(username);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string
  ): Promise<IUserResponseDto> {
    return this.usersService.findById(id);
  }

  @Patch(':id/toggle-active')
  toggleActive(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Req()
    req: IUserRequest
  ): Promise<ApiResponse> {
    return this.usersService.toggleActive(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateUserDto: UpdateUserDto,
    @Req()
    req: IUserRequest
  ): Promise<ApiResponse> {
    return this.usersService.update(id, updateUserDto, req.user.id);
  }
}
