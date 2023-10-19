import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//Module
import { AppModule } from './app.module';
//Config
import * as cors from 'cors';
import { config } from 'dotenv';
config();

const port = process.env.SERVER_PORT || '3001';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));
  await app.listen(port);
}
bootstrap();
