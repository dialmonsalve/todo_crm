import { IsInt, IsString } from 'class-validator';

export class CustomerMinified {
  @IsInt() id!: number;
  @IsString() name!: string;
  @IsString() company!: string | null;
  @IsString() email!: string;
  @IsString() phone!: string | null;
}
