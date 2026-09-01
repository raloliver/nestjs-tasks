/*
 * File: tasks.module.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:30:34 am
 * Last Modified: Tuesday, September 1st 2026, 4:38:39 pm
 * Copyright © 2021 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
