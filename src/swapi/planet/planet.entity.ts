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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film } from '../film/film.entity';
import { People } from '../people/people.entity';
import { IPlanet } from './planet.interface';

@Entity()
export class Planet implements IPlanet {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Tatooine' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: '23' })
  @Column()
  rotation_period: string;

  @ApiProperty({ example: '304' })
  @Column()
  orbital_period: string;

  @ApiProperty({ example: '10465' })
  @Column()
  diameter: string;

  @ApiProperty({ example: 'arid' })
  @Column()
  climate: string;

  @ApiProperty({ example: '1 standard' })
  @Column()
  gravity: string;

  @ApiProperty({ example: 'desert' })
  @Column()
  terrain: string;

  @ApiProperty({ example: '1' })
  @Column()
  surface_water: string;

  @ApiProperty({ example: '200000' })
  @Column()
  population: string;

  @ApiProperty({ example: 'https://localhost/api/planets/10' })
  @Column()
  url: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  edited: Date;

  @ApiRelProp(People)
  @OneToMany(() => People, (people) => people.homeworld)
  residents: People[];

  @ApiRelProp(Film)
  @ManyToMany(() => Film, (film) => film.planets)
  @JoinTable({ name: 'planets_films' })
  films: Film[];

  @ApiRelProp(File)
  @ManyToMany(() => File)
  @JoinTable({ name: 'planets_files' })
  files: File[];
}
