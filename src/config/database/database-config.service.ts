import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('database-postgresql.host');
  }

  get user(): string {
    return this.configService.get<string>('database-postgresql.user');
  }

  get password(): string {
    return this.configService.get<string>('database-postgresql.password');
  }

  get database(): string {
    return this.configService.get<string>('database-postgresql.database');
  }

  get port(): number {
    return Number(this.configService.get<number>('database-postgresql.port'));
  }
}
