/*
 * File: main.ts
 * Project: nestjs-tasks
 * Created: Thursday, September 2nd 2021, 8:43:02 pm
 * Last Modified: Friday, September 3rd 2021, 6:30:59 am
 * Copyright © 2021 AMDE Agência
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
