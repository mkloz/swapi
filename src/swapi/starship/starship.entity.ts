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
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { IStarship } from './starship.interface';

@Entity()
export class Starship implements IStarship {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'CR90 corvette' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: '60' })
  @Column()
  MGLT: string;

  @ApiProperty({ example: '3000000' })
  @Column()
  cargo_capacity: string;

  @ApiProperty({ example: '1 year' })
  @Column()
  consumables: string;

  @ApiProperty({ example: '3500000' })
  @Column()
  cost_in_credits: string;

  @ApiProperty({ example: '30-165' })
  @Column()
  crew: string;

  @ApiProperty({ example: '2.0' })
  @Column()
  hyperdrive_rating: string;

  @ApiProperty({ example: '150' })
  @Column()
  length: string;

  @ApiProperty({ example: 'Corellian Engineering Corporation' })
  @Column()
  manufacturer: string;

  @ApiProperty({ example: '950' })
  @Column()
  max_atmosphering_speed: string;

  @ApiProperty({ example: 'CR90 corvette' })
  @Column()
  model: string;

  @ApiProperty({ example: '600' })
  @Column()
  passengers: string;

  @ApiProperty({ example: 'corvette' })
  @Column()
  starship_class: string;

  @ApiProperty({ example: 'https://localhost/api/starships/2' })
  @Column()
  url: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiRelProp(People)
  @ManyToMany(() => People, (people) => people.starships)
  @JoinTable({ name: 'starships_people' })
  pilots: People[];

  @ApiRelProp(Film)
  @ManyToMany(() => Film, (film) => film.starships)
  @JoinTable({ name: 'starships_films' })
  films: Film[];

  @ApiRelProp(File)
  @ManyToMany(() => File)
  @JoinTable({ name: 'starships_files' })
  files: File[];
}
