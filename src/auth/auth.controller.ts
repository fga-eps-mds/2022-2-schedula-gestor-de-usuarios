import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ReqAuthUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { WhoAmIDto } from './dto/whoami.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*Rota para a criação de uma nova sessão */
  @Post()
  async authUser(
    @Body(ValidationPipe) reqAuthUser: ReqAuthUserDto,
  ): Promise<{ token: string }> {
    const logged = await this.authService.Auth(reqAuthUser);
    return { token: logged };
  }

  /*Rota para verificar a autorização de acordo com o perfil do usuário */
  @Get()
  whoAmI(@Headers('Authorization') authToken: string): WhoAmIDto {
    const userData = this.authService.whoAmI(authToken);
    return userData;
  }
}
