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
import { CreatePeopleDto } from './dto/create-people.dto';
import { PeopleService } from './people.service';
import { IdDto } from 'src/common/dto/id.dto';
import { PagDto } from '../common/dto/pag.dto';
import { DefaultPagValuePipe } from '../common/pipes/default-pag-value.pipe';
import { UpdatePeopleDto } from './dto/update-people.dto';
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
import { People } from './people.entity';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiPaginatedResponse } from '../common/docs/paginate-response-api.decorator';
import { ID } from 'src/common/common.interface';
import { ApiDeleteResource } from '../common/docs/api-delete-resource.decorator';

@ApiTags('People')
@ApiBearerAuth()
@Controller('people')
@UseGuards(RoleAuthGuard)
@ApiExtraModels(People)
@UseInterceptors(ClassSerializerInterceptor)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @ApiOperation({ summary: 'Add new people' })
  @ApiResponseData(People, HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  public addOne(
    @Body() { relations, ...rest }: CreatePeopleDto,
  ): Promise<People> {
    return this.peopleService.addOne(rest, relations);
  }

  @Get('/:id')
  @ApiResponseData(People)
  @ApiOperation({ summary: 'Get one people by id' })
  @Roles(Role.USER, Role.ADMIN)
  public getOneById(@Param() id: IdDto): Promise<People> {
    return this.peopleService.getOneBy(id);
  }

  @Get()
  @ApiPaginatedResponse(People)
  @ApiOperation({ summary: 'Get many people' })
  @Roles(Role.USER, Role.ADMIN)
  public getMany(
    @Query(DefaultPagValuePipe) pag: PagDto,
  ): Promise<Pagination<People>> {
    return this.peopleService.getMany(pag);
  }

  @Put('/:id')
  @ApiPaginatedResponse(People)
  @ApiOperation({ summary: 'Update people by id' })
  @Roles(Role.ADMIN)
  public updeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: CreatePeopleDto,
  ): Promise<People> {
    return this.peopleService.updateBy(id, disc, relations);
  }

  @Patch('/:id')
  @ApiPaginatedResponse(People)
  @ApiOperation({ summary: 'Update people by id' })
  @Roles(Role.ADMIN)
  public patchUpdeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: UpdatePeopleDto,
  ): Promise<People> {
    return this.peopleService.patchUpdateBy(id, disc, relations);
  }

  @Delete()
  @ApiDeleteResource()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  public async deleteOne(@Body() id: IdDto): Promise<ID> {
    await this.peopleService.deleteBy(id);

    return id;
  }
}
