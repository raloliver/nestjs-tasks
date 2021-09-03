/*
 * File: tasks.controller.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:43:59 am
 * Last Modified: Friday, September 3rd 2021, 6:57:44 am
 * Copyright © 2021 AMDE Agência
 */

import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
}
