import { IBackSetFields, ID } from 'src/common/common.interface';
import { IPeople } from '../people/people.interface';
import { IFilm } from '../film/film.interface';
import { IFile } from 'src/file/file.interface';

export interface IPlanet
  extends IBackSetFields,
    IDiscriptionsPlanet,
    IRelationsPlanet,
    ID {}

export interface IDiscriptionsPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
}

export interface IRelationsPlanet {
  residents: IPeople[];
  films: IFilm[];
  files: IFile[];
}

export type IPlanetWithoutRelations = Exclude<IPlanet, IRelationsPlanet>;
