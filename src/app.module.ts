/*
 * File: app.module.ts
 * Project: nestjs-tasks
 * Created: Thursday, September 2nd 2021, 8:43:02 pm
 * Last Modified: Friday, September 3rd 2021, 6:30:56 am
 * Copyright © 2021 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
})
export class AppModule {}
