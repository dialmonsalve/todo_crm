import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class EncryptionService {
  generateUUID(): string {
    return randomUUID();
  }

  hash(password: string): string {
    return hashSync(password, 10);
  }

  compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }

  jwtSecret(): string {
    return randomUUID();
  }
}
