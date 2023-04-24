import { MigrationInterface, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/role/role.entity';

@Injectable()
export default class Roles1668123270029 implements MigrationInterface {
  name: 'RolesSeed1668123270029';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = queryRunner.manager.getRepository(Role);
    await repo.save(repo.create({ name: 'user' }));
    await repo.save(repo.create({ name: 'admin' }));
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM role WHERE name="user" OR name="admin"',
    );
  }
}
