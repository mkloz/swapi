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
import { IDiscriptionsSpecie } from '../specie.interface';
import { IRelationsFilm } from 'src/swapi/film/film.interface';
export class RCreateSpecieDto
  implements Partial<Record<keyof IRelationsFilm, number[]>>
{
  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  films?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  people?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  files?: number[];
}
export class CreateSpecieDto implements IDiscriptionsSpecie {
  @ApiProperty({ example: '180' })
  @IsString()
  average_height: string;

  @ApiProperty({ example: '120' })
  @IsString()
  average_lifespan: string;

  @ApiProperty({ example: 'mammal' })
  @IsString()
  classification: string;

  @ApiProperty({ example: 'sentient' })
  @IsString()
  designation: string;

  @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
  @IsString()
  eye_colors: string;

  @ApiProperty({ example: 'blonde, brown, black, red' })
  @IsString()
  hair_colors: string;

  @ApiProperty({ example: 'Galactic Basic' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'Human' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
  @IsString()
  skin_colors: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RCreateSpecieDto)
  relations?: RCreateSpecieDto;
}
