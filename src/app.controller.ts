import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*Define a controller da aplicação */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*rota padrão da aplicação */
  /*Espera-se como retorno a string hello world */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
