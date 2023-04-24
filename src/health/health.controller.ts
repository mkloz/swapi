import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HttpStatusCode } from 'axios';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { Role } from 'src/auth/role/helpers/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { IMySql, ISwapi } from 'src/configs/config';

@ApiBearerAuth()
@ApiTags('Healthcheck')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HttpCode(HttpStatusCode.Ok)
  @Roles(Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  @ApiOperation({ summary: 'Get state of program' })
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'swapi',
          this.configService.get<ISwapi>('swapi').swapiUrl,
        ),
      () => this.db.pingCheck(this.configService.get<IMySql>('mysql').database),
    ]);
  }
}
