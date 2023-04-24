import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'admin' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'admin' })
  password: string;
}
