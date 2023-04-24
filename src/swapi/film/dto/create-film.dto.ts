import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ApiRelDtoProp } from '../../common/docs/api-rel-dto-prop.decorator';
import { IDiscriptionsFilm, IRelationsFilm } from '../film.interface';

export class RCreateFilmDto
  implements Partial<Record<keyof IRelationsFilm, number[]>>
{
  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  planets?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  characters?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  species?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  starships?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  vehicles?: number[];

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  files?: number[];
}
export class CreateFilmDto implements IDiscriptionsFilm {
  @ApiProperty({ example: 'George Lucas' })
  @IsString()
  director: string;

  @ApiProperty({ example: 4 })
  @IsInt()
  @Type(() => Number)
  episode_id: number;

  @ApiProperty({ example: 'It is a period of civil war...' })
  @IsString()
  @Length(5, 500)
  opening_crawl: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  @IsString()
  release_date: string;

  @ApiProperty({ example: 'A New Hope' })
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RCreateFilmDto)
  relations?: RCreateFilmDto;
}
