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
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleService } from './vehicle.service';
import { IdDto } from 'src/common/dto/id.dto';
import { DefaultPagValuePipe } from '../common/pipes/default-pag-value.pipe';
import { PagDto } from '../common/dto/pag.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { Role } from 'src/auth/role/helpers/role.enum';
import { IVehicle } from './vehicle.interface';
import { Roles } from 'src/auth/role/roles.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Vehicle } from './vehicle.entity';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiPaginatedResponse } from '../common/docs/paginate-response-api.decorator';
import { ID } from 'src/common/common.interface';
import { ApiDeleteResource } from '../common/docs/api-delete-resource.decorator';

@ApiBearerAuth()
@ApiTags('Vehicles')
@Controller('vehicles')
@UseGuards(RoleAuthGuard)
@ApiExtraModels(Vehicle)
@UseInterceptors(ClassSerializerInterceptor)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponseData(Vehicle, HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add one vehicle' })
  public addOne(
    @Body() { relations, ...disc }: CreateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.addOne(disc, relations);
  }

  @Get('/:id')
  @ApiResponseData(Vehicle)
  @ApiOperation({ summary: 'Get one vehicle by id' })
  @Roles(Role.USER, Role.ADMIN)
  public getOneById(@Param() id: IdDto): Promise<IVehicle> {
    return this.vehicleService.getOneBy(id);
  }

  @Get()
  @ApiPaginatedResponse(Vehicle)
  @ApiOperation({ summary: 'Get many vehicles' })
  @Roles(Role.USER, Role.ADMIN)
  public getMany(
    @Query(DefaultPagValuePipe) pag: PagDto,
  ): Promise<Pagination<Vehicle>> {
    return this.vehicleService.getMany(pag);
  }

  @Put('/:id')
  @ApiResponseData(Vehicle)
  @ApiOperation({ summary: 'Update one vehicle by id' })
  @Roles(Role.ADMIN)
  public updeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: CreateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.updateBy(id, disc, relations);
  }

  @Patch('/:id')
  @ApiResponseData(Vehicle)
  @ApiOperation({ summary: 'Update one vehicle by id' })
  @Roles(Role.ADMIN)
  public patchUpdeteOne(
    @Param() id: IdDto,
    @Body() { relations, ...disc }: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.patchUpdateBy(id, disc, relations);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiDeleteResource()
  @Roles(Role.ADMIN)
  public async deleteOne(@Body() id: IdDto): Promise<ID> {
    await this.vehicleService.deleteBy(id);
    return id;
  }
}
