import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@src/users';
import { CreateUserDto } from '@src/users/dto';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const duplicateEamil = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (duplicateEamil) {
      throw new ConflictException();
    }

    const user = await this.usersService.create(createUserDto);
    return this.authService.userToToken(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  regenerateRefreshToken(@Request() req) {
    return this.authService.regenerateRefreshToken(req.user);
  }
}
