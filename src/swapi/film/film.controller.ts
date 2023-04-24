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
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IdDto } from 'src/common/dto/id.dto';
import { PagDto } from '../common/dto/pag.dto';
import { DefaultPagValuePipe } from '../common/pipes/default-pag-value.pipe';
import { Role } from 'src/auth/role/helpers/role.enum';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmService } from './film.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Film } from './film.entity';
import { ApiPaginatedResponse } from '../common/docs/paginate-response-api.decorator';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ID } from 'src/common/common.interface';
import { ApiDeleteResource } from '../common/docs/api-delete-resource.decorator';

@ApiTags('Films')
@ApiBearerAuth()
@ApiExtraModels(Film)
@Controller('films')
@UseGuards(RoleAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class FilmController {
  public constructor(private readonly filmService: FilmService) {}

  @Post()
  @ApiResponseData(Film, HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new film' })
  @Roles(Role.ADMIN)
  public create(@Body() { relations, ...disc }: CreateFilmDto): Promise<Film> {
    return this.filmService.addOne(disc, relations);
  }

  @Get('/:id')
  @ApiResponseData(Film)
  @ApiOperation({ summary: 'Get one film by id' })
  @Roles(Role.USER, Role.ADMIN)
  public getOneById(@Param() id: IdDto): Promise<Film> {
    return this.filmService.getOneBy(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get many films' })
  @ApiPaginatedResponse(Film)
  @Roles(Role.USER, Role.ADMIN)
  public getMany(
    @Query(DefaultPagValuePipe) pag: PagDto,
  ): Promise<Pagination<Film>> {
    return this.filmService.getMany(pag);
  }

  @Put('/:id')
  @ApiResponseData(Film)
  @ApiOperation({ summary: 'Update film by id' })
  @Roles(Role.ADMIN)
  public updeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: CreateFilmDto,
  ): Promise<Film> {
    return this.filmService.updateBy(id, disc, relations);
  }

  @Patch('/:id')
  @ApiResponseData(Film)
  @ApiOperation({ summary: 'Update film by id' })
  @Roles(Role.ADMIN)
  public patchUpdeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: UpdateFilmDto,
  ): Promise<Film> {
    return this.filmService.patchUpdateBy(id, disc, relations);
  }

  @Delete()
  @ApiDeleteResource()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  public async deleteOne(@Body() id: IdDto): Promise<ID> {
    await this.filmService.deleteBy(id);

    return id;
  }
}
