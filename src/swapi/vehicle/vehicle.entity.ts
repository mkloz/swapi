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
import { IVehicle } from './vehicle.interface';

@Entity()
export class Vehicle implements IVehicle {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Sand Crawler' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: '2 months' })
  @Column()
  consumables: string;

  @ApiProperty({ example: '50000' })
  @Column()
  cargo_capacity: string;

  @ApiProperty({ example: '150000' })
  @Column()
  cost_in_credits: string;

  @ApiProperty({ example: '46' })
  @Column()
  crew: string;

  @ApiProperty({ example: '36.8' })
  @Column()
  length: string;

  @ApiProperty({ example: 'Corellia Mining Corporation' })
  @Column()
  manufacturer: string;

  @ApiProperty({ example: '30' })
  @Column()
  max_atmosphering_speed: string;

  @ApiProperty({ example: 'Digger Crawler' })
  @Column()
  model: string;

  @ApiProperty({ example: '30' })
  @Column()
  passengers: string;

  @ApiProperty({ example: 'wheeled' })
  @Column()
  vehicle_class: string;

  @ApiProperty({ example: 'https://localhost/api/vehicles/4' })
  @Column()
  url: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiRelProp(People)
  @ManyToMany(() => People, (people) => people.vehicles)
  @JoinTable({ name: 'vehicles_people' })
  pilots: People[];

  @ApiRelProp(Film)
  @ManyToMany(() => Film, (film) => film.vehicles)
  @JoinTable({ name: 'vehicles_films' })
  films: Film[];

  @ApiRelProp(File)
  @ManyToMany(() => File)
  @JoinTable({ name: 'vehicles_files' })
  files: File[];
}
