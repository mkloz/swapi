import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ApiRelProp } from '../common/docs/api-rel-prop.decorator';
import { File } from 'src/file/file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film } from '../film/film.entity';
import { Planet } from '../planet/planet.entity';
import { Specie } from '../specie/specie.entity';
import { Starship } from '../starship/starship.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { IPeople } from './people.interface';

@Entity()
export class People implements IPeople {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Luke Skywalker' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: '77' })
  @Column()
  mass: string;

  @ApiProperty({ example: '172' })
  @Column()
  height: string;

  @ApiProperty({ example: 'blond' })
  @Column()
  hair_color: string;

  @ApiProperty({ example: 'fair' })
  @Column()
  skin_color: string;

  @ApiProperty({ example: 'blue' })
  @Column()
  eye_color: string;

  @ApiProperty({ example: '19BBY' })
  @Column()
  birth_year: string;

  @ApiProperty({ example: 'male' })
  @Column()
  gender: string;

  @ApiProperty({ example: 'https://localhost/api/people/1' })
  @Column()
  url: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ApiRelProp(Planet)
  @ManyToOne(() => Planet, (planet) => planet.residents, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  homeworld: Planet;

  @ApiRelProp(Film)
  @ManyToMany(() => Film, (film) => film.characters)
  films: Film[];

  @ApiRelProp(Specie)
  @ManyToMany(() => Specie, (species) => species.people)
  species: Specie[];

  @ApiRelProp(Vehicle)
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots)
  vehicles: Vehicle[];

  @ApiRelProp(Starship)
  @ManyToMany(() => Starship, (starship) => starship.pilots)
  starships: Starship[];

  @ApiRelProp(File)
  @ManyToMany(() => File)
  @JoinTable({ name: 'people_files' })
  files: File[];
}
