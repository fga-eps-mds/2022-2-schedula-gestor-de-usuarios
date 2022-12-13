import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './src/users/user.entity';
import { teste1670717950519 } from './migrations/1670717950519-teste';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_DB,
  entities: ['./src/**/*.entity.ts'],
  migrations: [teste1670717950519],
});
