import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get bcrypt_salt_rounds(): number {
    return Number(this.configService.get<number>('auth.bcrypt_salt_rounds'));
  }
}
