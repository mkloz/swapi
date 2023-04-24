import { Injectable } from '@nestjs/common';
import { ResourceService } from '../common/resource.service';
import { IDiscriptionsVehicle, IRelationsVehicle } from './vehicle.interface';
import { Vehicle } from './vehicle.entity';
import { VehicleRepository } from './vehicle.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VehicleService extends ResourceService<
  Vehicle,
  IDiscriptionsVehicle,
  Record<keyof IRelationsVehicle, number[]>
> {
  constructor(vehicleRepo: VehicleRepository, configService: ConfigService) {
    super(configService, vehicleRepo);
  }
}
