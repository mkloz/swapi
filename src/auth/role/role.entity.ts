import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user' })
  @Column({ unique: true, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Array of users with this role',
    isArray: true,
  })
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
