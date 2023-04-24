import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ApiRelProp } from '../common/docs/api-rel-prop.decorator';
import { File } from 'src/file/file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { People } from '../people/people.entity';
import { Planet } from '../planet/planet.entity';
import { Specie } from '../specie/specie.entity';
import { Starship } from '../starship/starship.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { IFilm } from './film.interface';

@Entity()
export class Film implements IFilm {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'A New Hope' })
  @Column({ unique: true })
  title: string;

  @ApiProperty({ example: 'George Lucas' })
  @Column()
  director: string;

  @ApiProperty({ example: 4 })
  @Column()
  episode_id: number;

  @ApiProperty({ example: 'It is a period of civil war...' })
  @Column({ type: 'text' })
  opening_crawl: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @Column()
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  @Column({ type: 'date' })
  release_date: string;

  @ApiProperty({ example: 'https://localhost/api/films/1' })
  @Column()
  url: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiRelProp(Planet)
  @ManyToMany(() => Planet, (planet) => planet.films)
  planets: Planet[];

  @ApiRelProp(People)
  @ManyToMany(() => People, (people) => people.films)
  @JoinTable({ name: 'films_people' })
  characters: People[];

  @ApiRelProp(Specie)
  @ManyToMany(() => Specie, (specie) => specie.films)
  species: Specie[];

  @ApiRelProp(Starship)
  @ManyToMany(() => Starship, (starship) => starship.films)
  starships: Starship[];

  @ApiRelProp(Vehicle)
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films)
  vehicles: Vehicle[];

  @ApiRelProp(File)
  @ManyToMany(() => File)
  @JoinTable({ name: 'films_files' })
  files: File[];
}
