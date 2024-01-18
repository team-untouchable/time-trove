import { registerAs } from '@nestjs/config';

export const authConfiguration = registerAs('auth', () => ({
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expiration_time: process.env.JWT_ACCESS_EXPIRATION_TIME,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expiration_timet: process.env.JWT_REFRESH_EXPIRATION_TIME,
}));
