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
import { IDiscriptionsPeople, IRelationsIDPeople } from '../people.interface';

export class RCreatePeopleDto implements Partial<IRelationsIDPeople> {
  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  films?: number[];

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
  homeworld?: number;

  @ApiRelDtoProp()
  @IsNumber({}, { each: true })
  @IsOptional()
  files?: number[];
}
export class CreatePeopleDto implements IDiscriptionsPeople {
  @ApiProperty({ example: 'Luke Skywalker' })
  @IsString()
  name: string;

  @ApiProperty({ example: '77' })
  @IsString()
  mass: string;

  @ApiProperty({ example: '172' })
  @IsString()
  height: string;

  @ApiProperty({ example: 'blond' })
  @IsString()
  hair_color: string;

  @ApiProperty({ example: 'fair' })
  @IsString()
  skin_color: string;

  @ApiProperty({ example: 'blue' })
  @IsString()
  eye_color: string;

  @ApiProperty({ example: '19BBY' })
  @IsString()
  birth_year: string;

  @ApiProperty({ example: 'male' })
  @IsString()
  gender: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RCreatePeopleDto)
  relations?: RCreatePeopleDto;
}
