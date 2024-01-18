import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@src/users';
import * as bcrypt from 'bcrypt';
import type { LoginDto } from './dto';
import type { JwtAccessPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
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

  async login(user: JwtAccessPayload) {
    const payload = {
      username: user.username,
      uid: user.uid,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
