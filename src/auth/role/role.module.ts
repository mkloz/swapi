import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleAuthGuard } from '../guards/role-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, RoleAuthGuard],
  exports: [RoleService],
})
export class RoleModule {}
