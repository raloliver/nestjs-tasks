/*
 * File: main.ts
 * Project: nestjs-tasks
 * Created: Thursday, September 2nd 2021, 8:43:02 pm
 * Last Modified: Tuesday, July 5th 2022, 6:45:13 am
 * Copyright © 2021 AMDE Agência
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
