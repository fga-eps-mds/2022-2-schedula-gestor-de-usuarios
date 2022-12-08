import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { ReqLoginUserDto, ResLoginUserDto } from './login.dto';
import { LoginService } from './login.service';
//import { User } from './user.entity'

@Controller('auth')
export class LoginController {
  constructor(private readonly LoginService: LoginService) {}

  @Post()
  async authUser(@Request() req, @Response() res): Promise<ResLoginUserDto> {
    try {
      const logged = await this.LoginService.Auth(req.body);
      return res.status(200).json(logged);
    } catch (err) {
      res.status(404).json(err.message);
    }
  }
}
