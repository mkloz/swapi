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
import { CreateStarshipDto } from './dto/create-starship.dto';
import { StarshipService } from './starship.service';
import { IdDto } from 'src/common/dto/id.dto';
import { DefaultPagValuePipe } from '../common/pipes/default-pag-value.pipe';
import { PagDto } from '../common/dto/pag.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
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
import { Starship } from './starship.entity';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiPaginatedResponse } from '../common/docs/paginate-response-api.decorator';
import { ID } from 'src/common/common.interface';
import { ApiDeleteResource } from '../common/docs/api-delete-resource.decorator';

@ApiTags('Starships')
@ApiBearerAuth()
@Controller('starships')
@UseGuards(RoleAuthGuard)
@ApiExtraModels(Starship)
@UseInterceptors(ClassSerializerInterceptor)
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponseData(Starship, HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add one starship' })
  public addOne(
    @Body() { relations, ...disc }: CreateStarshipDto,
  ): Promise<Starship> {
    return this.starshipService.addOne(disc, relations);
  }

  @Get('/:id')
  @ApiResponseData(Starship)
  @ApiOperation({ summary: 'Get one starship by id' })
  @Roles(Role.USER, Role.ADMIN)
  public getOneById(@Param() id: IdDto): Promise<Starship> {
    return this.starshipService.getOneBy(id);
  }

  @Get()
  @ApiPaginatedResponse(Starship)
  @ApiOperation({ summary: 'Get many starships' })
  @Roles(Role.USER, Role.ADMIN)
  public getMany(
    @Query(DefaultPagValuePipe) pag: PagDto,
  ): Promise<Pagination<Starship>> {
    return this.starshipService.getMany(pag);
  }

  @Patch('/:id')
  @ApiResponseData(Starship)
  @ApiOperation({ summary: 'Update one starship by id' })
  @Roles(Role.ADMIN)
  public patchUpdeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: UpdateStarshipDto,
  ): Promise<Starship> {
    return this.starshipService.patchUpdateBy(id, disc, relations);
  }

  @Put('/:id')
  @ApiResponseData(Starship)
  @ApiOperation({ summary: 'Update one starship by id' })
  @Roles(Role.ADMIN)
  public updeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: CreateStarshipDto,
  ): Promise<Starship> {
    return this.starshipService.updateBy(id, disc, relations);
  }

  @Delete()
  @ApiDeleteResource()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  public async deleteOne(@Body() id: IdDto): Promise<ID> {
    await this.starshipService.deleteBy(id);
    return id;
  }
}
