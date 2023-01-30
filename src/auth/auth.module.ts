import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { AdminStrategy } from './admin.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'super-secret',
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AdminStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
