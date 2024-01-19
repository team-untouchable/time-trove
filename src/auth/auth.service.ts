import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from '@src/config';
import { UsersService } from '@src/users';
import * as bcrypt from 'bcrypt';
import type { LoginDto } from './dto';
import type { JwtAccessPayload, JwtRefreshPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private authConfigService: AuthConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const user = await this.usersService.findOneWithPassword(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }

  async login(jwtAccessPayload: JwtAccessPayload) {
    const refreshPayload: JwtRefreshPayload = {
      uid: jwtAccessPayload.uid,
    };

    const accessToken = this.jwtService.sign(jwtAccessPayload);
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.authConfigService.jwt_refresh_secret,
      expiresIn: this.authConfigService.jwt_refresh_expiration_time,
    });

    await this.usersService.updateSession({
      id: jwtAccessPayload.uid,
      token: refreshToken,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async validateRefreshToken({ uid }: JwtRefreshPayload, token) {
    const user = await this.usersService.findOneByIdWithSession(uid);
    if (!user || user.session !== token) {
      return false;
    }
    return true;
  }

  async regenerateRefreshToken(jwtRefreshPayload: JwtRefreshPayload) {
    const user = await this.usersService.findOneById(jwtRefreshPayload.uid);
    const accessPayload: JwtAccessPayload = {
      uid: user.id,
      email: user.email,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(accessPayload);
    const refreshToken = this.jwtService.sign(jwtRefreshPayload, {
      secret: this.authConfigService.jwt_refresh_secret,
      expiresIn: this.authConfigService.jwt_refresh_expiration_time,
    });

    await this.usersService.updateSession({
      id: jwtRefreshPayload.uid,
      token: refreshToken,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
