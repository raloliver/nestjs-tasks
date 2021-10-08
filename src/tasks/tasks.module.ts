/*
 * File: tasks.module.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:30:34 am
 * Last Modified: Friday, September 3rd 2021, 6:45:25 am
 * Copyright © 2021 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
