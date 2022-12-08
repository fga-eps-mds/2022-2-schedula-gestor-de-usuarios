import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserCRUD } from 'nao feito ainda';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCRUD]),
    JwtModule.register({
      secret: 'super-secret',
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
