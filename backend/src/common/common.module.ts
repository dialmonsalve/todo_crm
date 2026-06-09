import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@cDatabase/prisma.service';
import { PaginateModule } from './paginate/paginate.module';
import { EncryptionService } from './services/encryption.service';

@Global()
@Module({
  providers: [PrismaService, EncryptionService],
  exports: [PrismaService, EncryptionService],
  imports: [PaginateModule],
})
export class PrismaModule {}
