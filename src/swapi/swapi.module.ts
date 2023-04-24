import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetModule } from './planet/planet.module';
import { FilmModule } from './film/film.module';
import { SpecieModule } from './specie/specie.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { StarshipModule } from './starship/starship.module';

@Module({
  imports: [
    PeopleModule,
    PlanetModule,
    FilmModule,
    SpecieModule,
    VehicleModule,
    StarshipModule,
  ],
})
export class SwapiModule {}
