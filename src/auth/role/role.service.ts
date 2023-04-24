import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Role as Roles } from './helpers/role.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}
  async create(name: Roles) {
    return await this.roleRepo.save(this.roleRepo.create({ name }));
  }

  getRole(name: string) {
    return this.roleRepo.findOneBy({ name });
  }
}
