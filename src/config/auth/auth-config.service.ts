import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get bcrypt_salt_rounds(): number {
    return Number(this.configService.get<number>('auth.bcrypt_salt_rounds'));
  }

  get jwt_access_secret(): string {
    return this.configService.get<string>('auth.jwt_access_secret');
  }

  get jwt_access_expiration_time(): number {
    return Number(
      this.configService.get<number>('auth.jwt_access_expiration_time'),
    );
  }

  get jwt_refresh_secret(): string {
    return this.configService.get<string>('auth.jwt_refresh_secret');
  }

  get jwt_refresh_expiration_time(): number {
    return Number(
      this.configService.get<number>('auth.jwt_refresh_expiration_time'),
    );
  }
}
