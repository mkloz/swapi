import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { DEFAULT_COUNT } from '../pipes/default-pag-value.pipe';

export class PagDto {
  @ApiProperty({ required: false, default: 1 })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;
  @ApiProperty({ required: false, default: DEFAULT_COUNT })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;
}
