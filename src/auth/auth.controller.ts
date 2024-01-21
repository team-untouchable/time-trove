/* eslint-disable import/no-cycle */
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomApiResponse } from '@src/common';
import { CreateUserDto, UsersService } from '@src/users';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto } from './dto';
import { JwtAuthGuard, JwtRefreshAuthGuard, LocalAuthGuard } from './guards';
import type { JwtAccessPayload, JwtRefreshPayload } from './types';
import { RequestWithPayload } from './types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  @Post('register')
  @ApiExtraModels(AuthResponseDto)
  @CustomApiResponse(AuthResponseDto, ApiCreatedResponse)
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
  @ApiExtraModels(AuthResponseDto)
  @CustomApiResponse(AuthResponseDto)
  login(
    @Request() req: RequestWithPayload<JwtAccessPayload>,
    @Body() _: LoginDto,
  ) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBody({ schema: { properties: { refresh_token: { type: 'string' } } } })
  @ApiExtraModels(AuthResponseDto)
  @CustomApiResponse(AuthResponseDto, ApiCreatedResponse)
  regenerateRefreshToken(
    @Request() req: RequestWithPayload<JwtRefreshPayload>,
  ) {
    return this.authService.regenerateRefreshToken(req.user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiNoContentResponse()
  async logout(@Request() req: RequestWithPayload<JwtAccessPayload>) {
    await this.authService.logout(req.user);
  }

  @Delete('unregister')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiNoContentResponse()
  async unregister(@Request() req: RequestWithPayload<JwtAccessPayload>) {
    await this.usersService.remove(req.user.uid);
  }
}
