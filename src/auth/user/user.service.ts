import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ID } from 'src/common/common.interface';
import { RoleService } from 'src/auth/role/role.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

export const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly roleService: RoleService,
  ) {}
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async add({ username, password, roles }: CreateUserDto): Promise<User> {
    const ent = this.userRepo.create({ username });
    ent.roles = await Promise.all(
      roles.map((role) => this.roleService.getRole(role)),
    );
    ent.password = await UserService.hashPassword(password);
    return await this.userRepo.save(ent);
  }

  getByName(username: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { username },
      relations: ['roles'],
    });
  }
  getById(id: ID): Promise<User | null> {
    return this.userRepo.findOne({
      where: id,
      relations: ['roles'],
    });
  }
}
