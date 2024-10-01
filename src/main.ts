import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as dotenv } from '@dotenvx/dotenvx';
async function bootstrap() {
  dotenv();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173', // URL do seu frontend (ajuste se necessário)
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Login API')
    .setDescription('Uma API simples para autenticação e registro de usuários')
    .setVersion('1.0')
    .addTag('Autenticação')
    .addTag('Recursos Protegidos')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    ).build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
