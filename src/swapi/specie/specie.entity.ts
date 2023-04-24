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
import { ISpecie } from './specie.interface';

@Entity()
export class Specie implements ISpecie {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'Human' })
  name: string;

  @Column()
  @ApiProperty({ example: '180' })
  average_height: string;

  @Column()
  @ApiProperty({ example: '120' })
  average_lifespan: string;

  @Column()
  @ApiProperty({ example: 'mammal' })
  classification: string;

  @Column()
  @ApiProperty({ example: 'sentient' })
  designation: string;

  @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
  @Column()
  eye_colors: string;

  @Column()
  @ApiProperty({ example: 'blonde, brown, black, red' })
  hair_colors: string;

  @Column()
  @ApiProperty({ example: 'Galactic Basic' })
  language: string;

  @Column()
  @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
  skin_colors: string;

  @Column()
  @ApiProperty({ example: 'https://localhost/api/species/1/' })
  url: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiRelProp(People)
  @ManyToMany(() => People, (people) => people.species)
  @JoinTable({ name: 'species_people' })
  people: People[];

  @ApiRelProp(Film)
  @ManyToMany(() => Film, (film) => film.species)
  @JoinTable({ name: 'species_films' })
  films: Film[];

  @ApiRelProp(File)
  @ManyToMany(() => File)
  @JoinTable({ name: 'species_files' })
  files: File[];
}
