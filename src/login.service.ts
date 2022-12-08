import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ReqLoginUserDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
//import { User } from './user.entity'
//import { UserRepository } from './user.repository'

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async Auth(userData: CredentialsDto): Promise<> {
    const { email, password, username } = userData;
    let user;
    if (email) {
      user = this.userService.findOne({ email });
    } else if (username) {
      user = this.userService.findOne({ username });
    }
    if (!user) {
      throw new Error('Usúario não encontrado');
    }
    //user.password estara criptografada portanto precisamos que o CRUD de usuarios esteja pronto para implementar isso
    if (user.password == password) {
      const payload = { email: user.email, userId: user.Id };
      return this.jwtService.sign(payload);
    } else {
      throw new Error('Senha incorreta');
    }
  }
}

interface CredentialsDto {
  email?: string;
  username?: string;
  password: string;
}
