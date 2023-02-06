import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /* Rota para a criação de um novo usuário*/
  @Post()
  async createUser(
    @Body(ValidationPipe) createUsuarioDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUsuarioDto);
    return {
      user,
      message: 'Usuario cadastrado com sucesso',
    };
  }

  /* Rota para obter todos os usuários */
  @Get()
  async getUsers(): Promise<UserDto[]> {
    const users = await this.usersService.findUsers();
    return users;
  }

  /* Rota para obter um usuário */
  /* A rota recebe um id como parâmetro */
  @Get(':id')
  async findUserById(@Param('id') id): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  /* Rota para atualizar um usuário */
  /* A rota recebe um id e os dados do usuário atualizados como parâmetros */
  @Put(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserDto> {
    return this.usersService.updateUser(updateUserDto, id);
  }

  /* Rota para deletar um usuário */
  /* A rota recebe um id como parâmetro */
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
