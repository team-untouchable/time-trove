/* eslint-disable import/no-cycle */
import { Global, Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfigModule, AuthConfigService } from '@src/config';
import { User, UsersModule } from '@src/users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard, JwtRefreshAuthGuard } from './guards';
import { JwtRefreshStrategy, LocalStrategy } from './strategies';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
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
    TypeOrmModule.forFeature([User]),
    AuthConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtAuthGuard,
    JwtRefreshAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
