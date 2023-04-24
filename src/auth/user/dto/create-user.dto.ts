import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Role } from 'src/auth/role/helpers/role.enum';

export class CreateUserDto extends RegisterDto {
  @ApiProperty({
    description: 'Array of roles',
    isArray: true,
    enum: Role,
    example: ['user'],
  })
  @IsEnum(Role, { each: true })
  @IsArray()
  roles: Role[];
}
