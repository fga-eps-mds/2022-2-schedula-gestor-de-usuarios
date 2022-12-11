import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserProfile } from './user-profiles.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, username, profile, position, password } =
      createUserDto;
    const user = this.userRepository.create();
    user.email = email;
    user.name = name;
    user.profile = UserProfile[profile];
    user.username = username;
    user.position = position;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findUsers(): Promise<User[]> {
    const users = this.userRepository.find();
    if (!users)
      throw new NotFoundException('Não existem agendamentos cadastrados');
    return users;
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['email', 'name', 'profile', 'id'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }
  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    const { name, username, email, position, profile } = updateUserDto;
    user.name = name ? name : user.name;
    user.username = username ? username : user.username;
    user.email = email ? email : user.email;
    user.position = position ? position : user.position;
    user.profile = profile ? profile : user.profile;

    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
  async deleteUser(userId: string) {
    const result = await this.userRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }
}
