import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ITokenPayload, IUser } from 'src/auth/user/user.interface';
import { UserService } from 'src/auth/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/tokens.dto';
import { ConfigService } from '@nestjs/config';
import { IJWT } from 'src/configs/config';
import { Role } from './role/helpers/role.enum';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(username: string, password: string): Promise<TokensDto> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateTokens({ username, roles: user.roles });
  }

  public async refresh(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<IJWT>('jwt').refreshToken.secret,
      });

      if (!AuthService.isTokenPayload(payload)) {
        throw new UnauthorizedException();
      }
      return await this.generateTokens({
        username: payload.username,
        roles: payload.roles,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  public static isTokenPayload(payload: unknown): payload is ITokenPayload {
    return (
      typeof payload == 'object' &&
      'username' in payload &&
      typeof payload.username == 'string' &&
      'roles' in payload &&
      Array.isArray(payload.roles)
    );
  }

  public async register(username: string, password: string) {
    await this.userService.add({ username, password, roles: [Role.USER] });

    return this.login(username, password);
  }

  private async generateAccessToken(payload: ITokenPayload): Promise<string> {
    const configJwtAccess = this.configService.get<IJWT>('jwt').accessToken;

    return await this.jwtService.signAsync(payload, {
      expiresIn: configJwtAccess.time,
      secret: configJwtAccess.secret,
    });
  }
  private async generateRefreshToken(payload: ITokenPayload): Promise<string> {
    const configJwtRefresh = this.configService.get<IJWT>('jwt').refreshToken;

    return await this.jwtService.signAsync(payload, {
      expiresIn: configJwtRefresh.time,
      secret: configJwtRefresh.secret,
    });
  }
  private async generateTokens(payload: ITokenPayload): Promise<TokensDto> {
    const response = new TokensDto();

    response.accessToken = await this.generateAccessToken(payload);
    response.refreshToken = await this.generateRefreshToken(payload);

    return response;
  }
  async validateUser(username: string, password: string) {
    const user: IUser | null = await this.userService.getByName(username);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return { id: user.id, roles: user.roles };
      }
    }
    return null;
  }
}
