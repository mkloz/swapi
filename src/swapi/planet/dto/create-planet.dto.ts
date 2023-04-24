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
import { IDiscriptionsPlanet, IRelationsPlanet } from '../planet.interface';
export class RCreatePlanetDto
  implements Partial<Record<keyof IRelationsPlanet, number[]>>
{
  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  films?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  residents?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  files?: number[];
}
export class CreatePlanetDto implements IDiscriptionsPlanet {
  @ApiProperty({ example: 'Tatooine' })
  @IsString()
  name: string;

  @ApiProperty({ example: '23' })
  @IsString()
  rotation_period: string;

  @ApiProperty({ example: '304' })
  @IsString()
  orbital_period: string;

  @ApiProperty({ example: '10465' })
  @IsString()
  diameter: string;

  @ApiProperty({ example: 'arid' })
  @IsString()
  climate: string;

  @ApiProperty({ example: '1 standard' })
  @IsString()
  gravity: string;

  @ApiProperty({ example: 'desert' })
  @IsString()
  terrain: string;

  @ApiProperty({ example: '1' })
  @IsString()
  surface_water: string;

  @ApiProperty({ example: '200000' })
  @IsString()
  population: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RCreatePlanetDto)
  relations?: RCreatePlanetDto;
}
