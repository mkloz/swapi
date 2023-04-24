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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { PlanetService } from './planet.service';
import { IdDto } from 'src/common/dto/id.dto';
import { DefaultPagValuePipe } from '../common/pipes/default-pag-value.pipe';
import { PagDto } from '../common/dto/pag.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
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
import { Planet } from './planet.entity';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiPaginatedResponse } from '../common/docs/paginate-response-api.decorator';
import { ID } from 'src/common/common.interface';
import { ApiDeleteResource } from '../common/docs/api-delete-resource.decorator';

@ApiTags('Planets')
@ApiBearerAuth()
@Controller('planets')
@UseGuards(RoleAuthGuard)
@ApiExtraModels(Planet)
@UseInterceptors(ClassSerializerInterceptor)
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Post()
  @ApiResponseData(Planet, HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add one new planet' })
  @Roles(Role.ADMIN)
  public addOne(
    @Body() { relations, ...disc }: CreatePlanetDto,
  ): Promise<Planet> {
    return this.planetService.addOne(disc, relations);
  }

  @Get('/:id')
  @ApiResponseData(Planet)
  @ApiOperation({ summary: 'Get planet by id' })
  @Roles(Role.USER, Role.ADMIN)
  public getOneById(@Param() id: IdDto): Promise<Planet> {
    return this.planetService.getOneBy(id);
  }

  @Get()
  @ApiPaginatedResponse(Planet)
  @ApiOperation({ summary: 'Get many planets' })
  @Roles(Role.USER, Role.ADMIN)
  public getMany(
    @Query(DefaultPagValuePipe) pag: PagDto,
  ): Promise<Pagination<Planet>> {
    return this.planetService.getMany(pag);
  }

  @Patch('/:id')
  @ApiResponseData(Planet)
  @ApiOperation({ summary: 'Update planet by id' })
  @Roles(Role.ADMIN)
  public patchUpdeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: UpdatePlanetDto,
  ): Promise<Planet> {
    return this.planetService.patchUpdateBy(id, disc, relations);
  }

  @Put('/:id')
  @ApiResponseData(Planet)
  @ApiOperation({ summary: 'Update planet by id' })
  @Roles(Role.ADMIN)
  public updeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: CreatePlanetDto,
  ): Promise<Planet> {
    return this.planetService.updateBy(id, disc, relations);
  }

  @Delete()
  @ApiDeleteResource()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  public async deleteOne(@Body() id: IdDto): Promise<ID> {
    await this.planetService.deleteBy(id);

    return id;
  }
}
