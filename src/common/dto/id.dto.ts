import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IdDto {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  id: number;
}
