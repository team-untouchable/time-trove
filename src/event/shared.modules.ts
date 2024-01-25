import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '@src/auth/guards';
import { AuthConfigModule, AuthConfigService } from '@src/config/auth';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: async (configService: AuthConfigService) => ({
        secret: configService.jwt_access_secret,
        signOptions: {
          expiresIn: configService.jwt_access_expiration_time,
        },
      }),
    }),
  ],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class SharedModule {}
