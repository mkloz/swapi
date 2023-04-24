import { IBackSetFields, ID } from 'src/common/common.interface';
import { IPlanet } from '../planet/planet.interface';
import { IPeople } from '../people/people.interface';
import { ISpecie } from '../specie/specie.interface';
import { IStarship } from '../starship/starship.interface';
import { IVehicle } from '../vehicle/vehicle.interface';
import { IFile } from 'src/file/file.interface';

export interface IDiscriptionsFilm {
  director: string;
  episode_id: number;
  opening_crawl: string;
  producer: string;
  release_date: string;
  title: string;
}
export interface IRelationsFilm {
  planets: IPlanet[];
  characters: IPeople[];
  species: ISpecie[];
  starships: IStarship[];
  vehicles: IVehicle[];
  files: IFile[];
}
export type IFilmWithoutRelations = Exclude<IFilm, IRelationsFilm>;
export interface IFilm
  extends IDiscriptionsFilm,
    IRelationsFilm,
    IBackSetFields,
    ID {}
