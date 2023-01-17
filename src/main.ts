import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino/Logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Prisma example')
    .setDescription('The prisma API description')
    .setVersion('1.0')
    .addTag('prisma')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
