import { IBackSetFields, ID } from 'src/common/common.interface';
import { IFilm } from '../film/film.interface';
import { IPeople } from '../people/people.interface';
import { IFile } from 'src/file/file.interface';

export interface IVehicle
  extends IDiscriptionsVehicle,
    IRelationsVehicle,
    IBackSetFields,
    ID {}

export interface IDiscriptionsVehicle {
  consumables: string;
  cargo_capacity: string;
  cost_in_credits: string;
  crew: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  vehicle_class: string;
}
export interface IRelationsVehicle {
  pilots: IPeople[];
  films: IFilm[];
  files: IFile[];
}
export type IVehicleWithoutRelations = Exclude<IVehicle, IRelationsVehicle>;
