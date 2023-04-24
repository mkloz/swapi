import { MigrationInterface, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/role/role.entity';
import { User } from 'src/auth/user/user.entity';
import * as bcrypt from 'bcryptjs';
import { Role as Roles } from 'src/auth/role/helpers/role.enum';
import { getEnvVar } from 'src/configs/config';
import { SALT_ROUNDS } from 'src/auth/user/user.service';

@Injectable()
export default class Users1668124270029 implements MigrationInterface {
  name: 'RolesSeed1668124270029';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.manager.getRepository(User);
    const roleRepo = queryRunner.manager.getRepository(Role);
    const conf = getEnvVar().swapi;
    const ent = userRepo.create({
      username: conf.admin.name,
      password: await bcrypt.hash(conf.admin.pass, SALT_ROUNDS),
    });
    ent.roles = [await roleRepo.findOneBy({ name: Roles.ADMIN })];
    await userRepo.save(ent);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM user WHERE username="${getEnvVar().swapi.admin.name}"`,
    );
  }
}
