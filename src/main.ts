import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const appMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001
    }
  });

  const app = await NestFactory.create<INestApplication>(AppModule, {
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'],
      maxAge: Infinity,
      allowedHeaders: ['Content-Type', 'Authorization', 'Application-Type']
    }
  });
  app.enableCors();
  await appMicroservice.listen();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
