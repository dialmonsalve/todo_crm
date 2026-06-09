import { IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class IsActiveQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
   
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    
    return Boolean(value);
  })
  @IsBoolean()
  isActive?: boolean;
}