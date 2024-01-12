import { registerAs } from '@nestjs/config';

export const databaseConfiguration = registerAs('database-postgresql', () => ({
  host: process.env.DATABASE_POSTGRESQL_HOST,
  user: process.env.DATABASE_POSTGRESQL_USER,
  password: process.env.DATABASE_POSTGRESQL_PASSWORD,
  port: process.env.DATABASE_POSTGRESQL_PORT,
  database: process.env.DATABASE_POSTGRESQL_DATABASE,
}));
