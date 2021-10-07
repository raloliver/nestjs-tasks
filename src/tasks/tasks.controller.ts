/*
 * File: tasks.controller.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:43:59 am
 * Last Modified: Thursday, October 7th 2021, 8:23:02 am
 * Copyright © 2021 AMDE Agência
 */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  public getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  /**
   * @Body() just handle with attributes was sent by POST method, even there is other ones was not on Interface.
   *
   * Example: @Body() body.
   *
   * If you wanna share pick just some attributes, just follow the example below.
   */
  @Post()
  public addTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskService.addTask(title, description);
  }
}
