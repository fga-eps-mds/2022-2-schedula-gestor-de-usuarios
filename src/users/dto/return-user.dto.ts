import { UserDto } from './user.dto';

/* Classe que define o tipo de retorno */
export class ReturnUserDto {
  /* Usuário */
  user: UserDto;

  /* Mensagem de retorno */
  message: string;
}
