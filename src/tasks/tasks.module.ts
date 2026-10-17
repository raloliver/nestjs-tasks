/*
 * File: tasks.module.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:30:34 am
 * Last Modified: Saturday, October 17th 2026, 6:03:37 pm
 * Copyright © 2021 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
