import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5103,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
});
