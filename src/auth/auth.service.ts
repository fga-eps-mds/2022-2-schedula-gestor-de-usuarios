import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReqAuthUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bc from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async Auth(userData: ReqAuthUserDto) {
    const { email, password, username } = userData;
    let user;
    if (email) {
      user = await this.userRepo.findOneBy({ email });
    } else if (username) {
      user = await this.userRepo.findOneBy({ username });
    }
    if (!user) {
      throw new Error('Usúario não encontrado');
    }

    const decrypted = await bc.hash(password, user.salt);

    if (decrypted === user.password) {
      const payload = {
        username: user.username,
        email: user.email,
        userId: user.id,
      };
      return this.jwtService.sign(payload);
    } else {
      throw new InternalServerErrorException('Senha incorreta');
    }
  }
}
