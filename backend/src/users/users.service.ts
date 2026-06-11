import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UserTranslationHandler } from './translation/user-translation.handler';
import { EncryptionService } from '@cServices/encryption.service';

import type { IUserRepository, IUserResponseDto } from './interfaces';
import type { PaginatedResult } from '@cPaginate/interface';
import type { ApiResponse } from '@cInterfaces/api-response.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    protected readonly tr: UserTranslationHandler,
    private readonly encryptionService: EncryptionService
  ) {}

  async create(
    createUserDto: CreateUserDto,
    createdById: string
  ): Promise<ApiResponse> {
    const data = {
      ...createUserDto,
      password: this.encryptionService.hash(createUserDto.password),
    };

    const name = await this.userRepository.create(data, createdById);

    return {
      message: this.tr.create(name),
      statusCode: 201,
      error: null,
    };
  }

  findAll(
    paginationDto: PaginationUserDto
  ): Promise<PaginatedResult<IUserResponseDto>> {
    return this.userRepository.findAll(paginationDto);
  }

  async findById(id: string): Promise<IUserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user)
      throw new NotFoundException([this.tr.general('database.NOT_FOUND')]);

    return user;
  }

  async findByUsername(username: string): Promise<IUserResponseDto> {
    const user = await this.userRepository.findByUsername(username);
    if (!user)
      throw new NotFoundException([this.tr.general('database.NOT_FOUND')]);

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    updatedById: string
  ): Promise<ApiResponse> {
    const name = await this.userRepository.update(
      id,
      updateUserDto,
      updatedById
    );

    return {
      message: this.tr.update(name),
      statusCode: 200,
      error: null,
    };
  }

  async toggleActive(id: string, updatedById: string): Promise<ApiResponse> {
    const { name, isActive } = await this.userRepository.toggleActive(
      id,
      updatedById
    );

    return {
      message: this.tr.toggle(name, isActive),
      statusCode: 200,
      error: null,
    };
  }
}
