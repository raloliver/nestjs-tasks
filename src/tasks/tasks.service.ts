/*
 * File: tasks.service.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:56:13 am
 * Last Modified: Thursday, October 7th 2021, 2:24:30 pm
 * Copyright © 2021 AMDE Agência
 */

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { AddTaskDto } from './dto/add-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getTasks(): Task[] {
    return this.tasks;
  }

  public addTask(addTaskDto: AddTaskDto): Task {
    const { title, description } = addTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}