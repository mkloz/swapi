import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiRelDtoProp } from '../../common/docs/api-rel-dto-prop.decorator';
import {
  IDiscriptionsStarship,
  IRelationsStarship,
} from '../starship.interface';
export class RCreateStarshipDto
  implements Partial<Record<keyof IRelationsStarship, number[]>>
{
  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  films?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  pilots?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  files?: number[];
}
export class CreateStarshipDto implements IDiscriptionsStarship {
  @ApiProperty({ example: '60' })
  @IsString()
  MGLT: string;

  @ApiProperty({ example: '3000000' })
  @IsString()
  cargo_capacity: string;

  @ApiProperty({ example: '1 year' })
  @IsString()
  consumables: string;

  @ApiProperty({ example: '3500000' })
  @IsString()
  cost_in_credits: string;

  @ApiProperty({ example: '30-165' })
  @IsString()
  crew: string;

  @ApiProperty({ example: '2.0' })
  @IsString()
  hyperdrive_rating: string;

  @ApiProperty({ example: '150' })
  @IsString()
  length: string;

  @ApiProperty({ example: 'Corellian Engineering Corporation' })
  @IsString()
  manufacturer: string;

  @ApiProperty({ example: '950' })
  @IsString()
  max_atmosphering_speed: string;

  @ApiProperty({ example: 'CR90 corvette' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'CR90 corvette' })
  @IsString()
  name: string;

  @ApiProperty({ example: '600' })
  @IsString()
  passengers: string;

  @ApiProperty({ example: 'corvette' })
  @IsString()
  starship_class: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RCreateStarshipDto)
  relations?: RCreateStarshipDto;
}
