import { registerAs } from '@nestjs/config';

export const authConfiguration = registerAs('auth', () => ({
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
}));
