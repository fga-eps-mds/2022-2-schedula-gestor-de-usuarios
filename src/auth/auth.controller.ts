import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Response,
} from '@nestjs/common';
import { ReqAuthUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Response as Res } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authUser(
    @Body(ValidationPipe) reqAuthUser: ReqAuthUserDto,
    @Response() res: Res,
  ): Promise<Res> {
    const logged = await this.authService.Auth(reqAuthUser);
    return res.set({ 'set-cookie': logged }).json({ token: logged });
  }
}
