/*
 * File: tasks.controller.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:43:59 am
 * Last Modified: Friday, October 8th 2021, 5:42:49 am
 * Copyright © 2021 AMDE Agência
 */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddTaskDto } from './dto/add-task-dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  public getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  /**
   * @Body() just handle with attributes was sent by POST method, even there is other ones was not on Interface.
   *
   * Example: @Body() body.
   *
   * If you wanna share pick just some attributes, just follow the example below.
   * @Body('title') title: string,
   * @Body('description') description: string,
   */
  @Post()
  public addTask(@Body() addTaskDto: AddTaskDto): Task {
    return this.taskService.addTask(addTaskDto);
  }
}
