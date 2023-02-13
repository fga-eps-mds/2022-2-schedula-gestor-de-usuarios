import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReqAuthUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bc from 'bcrypt';
import { User } from '../users/user.entity';
import { WhoAmIDto } from './dto/whoami.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /* Recebe o login e senha de um usuário */
  /* Retorna os dados de um usuário cadastrado */
  async Auth(userData: ReqAuthUserDto) {
    const { email, password, username } = userData;
    let user;
    /*Verifica se o valor posto no campo de login trata-se de um email ou um nome de usuário */
    if (email) {
      user = await this.userRepo.findOneBy({ email });
    } else if (username) {
      user = await this.userRepo.findOneBy({ username });
    }
    if (!user) {
      throw new Error('Usuário não encontrado');
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

  /*Retorna os dados de um usuário presentes no token*/
  async whoAmI(authToken: string) {
    try {
      const token = authToken.replace('Bearer ', '');
      const tokenData = this.jwtService.decode(token) as WhoAmIDto;
      const user = await this.userRepo.findOneBy({ email: tokenData.email });

      return {
        email: user.email,
        username: user.username,
        userId: user.id,
        name: user.name,
        profile: user.profile,
      };
    } catch (e) {
      console.log('Token decode error: ', e);
      throw new UnauthorizedException('Token de autenticação inválido');
    }
  }
}
