import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*Inicia a aplicação */
async function bootstrap() {
  /*Cria o módulo da aplicação */
  const app = await NestFactory.create(AppModule);

  /*HAbilita o Cors */
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
