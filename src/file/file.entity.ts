import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'c2c572fc-2075-4f58-afc8-575cbbfe6223' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'https://host:port/c2c572fc-2075-4f58-afc8-575cbbfe6223',
  })
  @Column()
  url: string;
}
