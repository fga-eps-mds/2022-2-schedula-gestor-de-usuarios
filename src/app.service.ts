import { Injectable } from '@nestjs/common';

/*Serviço da aplicação */
@Injectable()
export class AppService {
  /*Retornar uma mensagem com a string Hello World */
  getHello(): string {
    return 'Hello World!';
  }
}
