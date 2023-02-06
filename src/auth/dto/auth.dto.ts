import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ReqAuthUserDto {
  /* Campo opcional */
  @IsOptional()
  /* Verifica se o email é válido */
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  /*Email */
  /*Máximo de 200 caracteres */
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  email?: string;

  /* Campo opcional */
  @IsOptional()
  /*Máximo de 200 caracteres */
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  username?: string;

  /* Campo obrigatório */
  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  /* Mínimo de 6 caracteres */
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  password: string;
}
