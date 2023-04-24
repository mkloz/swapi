import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { SpecieService } from './specie.service';
import { IdDto } from 'src/common/dto/id.dto';
import { DefaultPagValuePipe } from '../common/pipes/default-pag-value.pipe';
import { PagDto } from '../common/dto/pag.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { Role } from 'src/auth/role/helpers/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Specie } from './specie.entity';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiPaginatedResponse } from '../common/docs/paginate-response-api.decorator';
import { ID } from 'src/common/common.interface';
import { ApiDeleteResource } from '../common/docs/api-delete-resource.decorator';

@ApiTags('Species')
@ApiBearerAuth()
@Controller('species')
@UseGuards(RoleAuthGuard)
@ApiExtraModels(Specie)
@UseInterceptors(ClassSerializerInterceptor)
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @Post()
  @ApiResponseData(Specie, HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new specie' })
  @Roles(Role.ADMIN)
  public addOne(
    @Body() { relations, ...disc }: CreateSpecieDto,
  ): Promise<Specie> {
    return this.specieService.addOne(disc, relations);
  }

  @Get('/:id')
  @ApiResponseData(Specie)
  @ApiOperation({ summary: 'Get one specie by id' })
  @Roles(Role.USER, Role.ADMIN)
  public getOneById(@Param() id: IdDto): Promise<Specie> {
    return this.specieService.getOneBy(id);
  }

  @Get()
  @ApiPaginatedResponse(Specie)
  @ApiOperation({ summary: 'Get many species' })
  @Roles(Role.USER, Role.ADMIN)
  public getMany(
    @Query(DefaultPagValuePipe) pag: PagDto,
  ): Promise<Pagination<Specie>> {
    return this.specieService.getMany(pag);
  }

  @Put('/:id')
  @ApiResponseData(Specie)
  @ApiOperation({ summary: 'Update one specie by id' })
  @Roles(Role.ADMIN)
  public updeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: CreateSpecieDto,
  ): Promise<Specie> {
    return this.specieService.updateBy(id, disc, relations);
  }

  @Patch('/:id')
  @ApiResponseData(Specie)
  @ApiOperation({ summary: 'Update one specie by id' })
  @Roles(Role.ADMIN)
  public patchUpdeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: UpdateSpecieDto,
  ): Promise<Specie> {
    return this.specieService.patchUpdateBy(id, disc, relations);
  }

  @Delete()
  @ApiDeleteResource()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  public async deleteOne(@Body() id: IdDto): Promise<ID> {
    await this.specieService.deleteBy(id);

    return id;
  }
}
