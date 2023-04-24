import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/role/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Login123$' })
  @Column({ unique: true, nullable: false })
  username: string;

  @ApiProperty({ example: 'SecretPasword12#' })
  @Exclude()
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    description: 'Array of roles',
    isArray: true,
    enum: Role,
    example: ['user'],
  })
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'users_roles' })
  roles: Role[];
}
