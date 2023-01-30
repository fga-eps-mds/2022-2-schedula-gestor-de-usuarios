import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './src/users/user.entity';
import { teste1670717950519 } from './migrations/1670717950519-teste';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5103,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['./src/**/*.entity.ts'],
  migrations: [teste1670717950519],
});
