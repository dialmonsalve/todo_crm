import { IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
