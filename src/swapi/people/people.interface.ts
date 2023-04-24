import { IBackSetFields, ID } from 'src/common/common.interface';
import { IFile } from 'src/file/file.interface';
import { IPlanet } from '../planet/planet.interface';
import { IStarship } from '../starship/starship.interface';
import { IVehicle } from '../vehicle/vehicle.interface';
import { ISpecie } from '../specie/specie.interface';
import { IFilm } from '../film/film.interface';

export interface IPeople
  extends IBackSetFields,
    IDiscriptionsPeople,
    IRelationsPeople,
    ID {}
export interface IDiscriptionsPeople {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}
export interface IRelationsPeople {
  films: IFilm[];
  species: ISpecie[];
  vehicles: IVehicle[];
  starships: IStarship[];
  homeworld: IPlanet;
  files: IFile[];
}
export type IPeopleWithoutRelations = Exclude<IPeople, IRelationsPeople>;

export interface IRelationsIDPeople {
  films: number[];
  species: number[];
  vehicles: number[];
  starships: number[];
  homeworld: number;
  files: number[];
}
