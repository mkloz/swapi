import { PartialType } from '@nestjs/swagger';
import { CreateSpecieDto } from './create-specie.dto';

export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {}
