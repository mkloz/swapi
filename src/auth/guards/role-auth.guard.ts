import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from '../role/helpers/role.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from '../role/roles.decorator';

@Injectable()
export class RoleAuthGuard extends AuthGuard {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtServ: JwtService,
    private readonly configServ: ConfigService,
  ) {
    super(jwtServ, configServ);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const res = await super.canActivate(ctx);
    if (!res) return false;
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!roles.length) {
      return true;
    }

    const user = ctx.switchToHttp().getRequest<Request>().user;

    if (AuthService.isTokenPayload(user)) {
      return user.roles.some((userRole) =>
        roles.some((role) => role == userRole.name),
      );
    }
    return false;
  }
}
