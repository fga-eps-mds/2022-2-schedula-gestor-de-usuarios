import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ReqAuthUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

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
}
