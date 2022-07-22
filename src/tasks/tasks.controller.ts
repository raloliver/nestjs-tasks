/*
 * File: tasks.controller.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:43:59 am
 * Last Modified: Friday, July 8th 2022, 2:25:02 pm
 * Copyright © 2021 AMDE Agência
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AddTaskDtoTaskDto } from './dto/add-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  public getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksByFilter(filterDto);
    } else {
      return this.taskService.getTasks();
    }
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto
    return this.taskService.updateTaskStatus(id, status);
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
  public addTask(@Body() addTaskDto: AddTaskDtoTaskDto): Task {
    return this.taskService.addTask(addTaskDto);
  }

  @Delete('/:id')
  public removeTask(@Param('id') id: string): void {
    this.taskService.removeTask(id);
  }
}
