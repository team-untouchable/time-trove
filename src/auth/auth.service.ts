import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthConfigService } from '@src/config';
import { User } from '@src/users';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import type { LoginDto } from './dto';
import type { JwtAccessPayload, JwtRefreshPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private authConfigService: AuthConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const user: Pick<User, 'id' | 'email' | 'password' | 'username'> =
      await this.usersRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true, username: true },
      });
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

    await this.updateSession(jwtAccessPayload.uid, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async validateRefreshToken({ uid }: JwtRefreshPayload, token: string) {
    const user = await this.findSession(uid);
    if (!user || user.session !== token) {
      return false;
    }
    return true;
  }

  async regenerateRefreshToken(jwtRefreshPayload: JwtRefreshPayload) {
    const user = await this.findAccessPayloadData(jwtRefreshPayload.uid);
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

    await this.updateSession(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async userToToken(user: User) {
    const accessPayload: JwtAccessPayload = {
      uid: user.id,
      email: user.email,
      username: user.username,
    };
    const jwtRefreshPayload: JwtRefreshPayload = { uid: user.id };

    const accessToken = this.jwtService.sign(accessPayload);
    const refreshToken = this.jwtService.sign(jwtRefreshPayload, {
      secret: this.authConfigService.jwt_refresh_secret,
      expiresIn: this.authConfigService.jwt_refresh_expiration_time,
    });

    await this.updateSession(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private findSession(id: string): Promise<Pick<User, 'session'>> {
    return this.usersRepository.findOne({
      where: { id },
      select: { session: true },
    });
  }

  private async updateSession(id: string, token: string) {
    await this.usersRepository.update(id, { session: token });
  }

  private findAccessPayloadData(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      select: { id: true, email: true, username: true },
    });
  }
}
