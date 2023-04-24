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
import { IDiscriptionsVehicle, IRelationsVehicle } from '../vehicle.interface';
export class RCreateVehicleDto
  implements Partial<Record<keyof IRelationsVehicle, number[]>>
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
export class CreateVehicleDto implements IDiscriptionsVehicle {
  @ApiProperty({ example: '2 months' })
  @IsString()
  consumables: string;

  @ApiProperty({ example: '50000' })
  @IsString()
  cargo_capacity: string;

  @ApiProperty({ example: '150000' })
  @IsString()
  cost_in_credits: string;

  @ApiProperty({ example: '46' })
  @IsString()
  crew: string;

  @ApiProperty({ example: '36.8' })
  @IsString()
  length: string;

  @ApiProperty({ example: 'Corellia Mining Corporation' })
  @IsString()
  manufacturer: string;

  @ApiProperty({ example: '30' })
  @IsString()
  max_atmosphering_speed: string;

  @ApiProperty({ example: 'Digger Crawler' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'Sand Crawler' })
  @IsString()
  name: string;

  @ApiProperty({ example: '30' })
  @IsString()
  passengers: string;

  @ApiProperty({ example: 'wheeled' })
  @IsString()
  vehicle_class: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RCreateVehicleDto)
  relations?: RCreateVehicleDto;
}
