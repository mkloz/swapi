import { IBackSetFields, ID } from 'src/common/common.interface';
import { IPeople } from '../people/people.interface';
import { IFilm } from '../film/film.interface';
import { IFile } from 'src/file/file.interface';

export interface ISpecie
  extends IDiscriptionsSpecie,
    IRelationsSpecie,
    IBackSetFields,
    ID {}

export interface IDiscriptionsSpecie {
  average_height: string;
  average_lifespan: string;
  classification: string;
  designation: string;
  eye_colors: string;
  hair_colors: string;
  language: string;
  name: string;
  skin_colors: string;
}

export interface IRelationsSpecie {
  people: IPeople[];
  films: IFilm[];
  files: IFile[];
}
export type ISpecieWithoutRelations = Exclude<ISpecie, IRelationsSpecie>;
