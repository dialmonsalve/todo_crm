import { hashSync } from 'bcrypt';

import { randomUUID } from 'crypto';

export class Helpers {
  static hash(password: string): string {
    return hashSync(password, 10);
  }

  static jwtSecret(): string {
    return randomUUID();
  }

  static randomBetween0AndX(x: number): number {
    return Math.floor(Math.random() * x);
  }
}
