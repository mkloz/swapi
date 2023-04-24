import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';
import { VehicleService } from './vehicle.service';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { File } from 'src/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Film, People, File])],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
  exports: [VehicleRepository],
})
export class VehicleModule {}
