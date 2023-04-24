export interface IBackSetFields {
  created: Date;
  edited: Date;
  url: string;
}
export interface ID {
  id: number;
}
export interface IPagOpt {
  offset: number;
  count: number;
}
export interface Rel<T> {
  relations: T;
}
export interface URL {
  url: string;
}
export type RIDRes<R> = Record<keyof R, number[]>;
export type SRes<R> = Omit<Record<keyof R, string[]>, 'files'>;
export type DiscRes<D> = D & IBackSetFields & ID;
