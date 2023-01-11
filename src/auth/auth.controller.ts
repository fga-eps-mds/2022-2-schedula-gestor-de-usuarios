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

  @Post()
  async authUser(
    @Body(ValidationPipe) reqAuthUser: ReqAuthUserDto,
  ): Promise<{ token: string }> {
    const logged = await this.authService.Auth(reqAuthUser);
    return { token: logged };
  }

  @Get()
  whoAmI(@Headers('Authorization') authToken: string): WhoAmIDto {
    const userData = this.authService.whoAmI(authToken);
    return userData;
  }
}
