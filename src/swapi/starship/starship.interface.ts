import { IBackSetFields, ID } from 'src/common/common.interface';
import { IFile } from 'src/file/file.interface';
import { IFilm } from '../film/film.interface';
import { IPeople } from '../people/people.interface';

export interface IStarship
  extends IDiscriptionsStarship,
    IRelationsStarship,
    IBackSetFields,
    ID {}

export interface IDiscriptionsStarship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  crew: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  starship_class: string;
}

export interface IRelationsStarship {
  pilots: IPeople[];
  films: IFilm[];
  files: IFile[];
}
export type IStarshipWithoutRelations = Exclude<IStarship, IRelationsStarship>;
