/*
 * File: tasks.service.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:56:13 am
 * Last Modified: Tuesday, September 1st 2026, 5:22:06 pm
 * Copyright © 2021 AMDE Agência
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { AddTaskDtoTaskDto } from './dto/add-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    @InjectRepository(Task) private tasksRepository: TasksRepository,
  ) {}
  /*
  public getTasks(): Task[] {
    return this.tasks;
  }

  public getTasksByFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        }
      });
    }

    return tasks;
  }
 */

  public async getTaskById(id: string): Promise<Task> {
    const findTaskById = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!findTaskById) {
      throw new NotFoundException(`Task with ID ${id} was not found.`);
    }

    return findTaskById;
  }

  /*
  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }

  public addTask(addTaskDto: AddTaskDtoTaskDto): Task {
    const { title, description } = addTaskDto;

    const task: Task = {
      id: 'uuid',
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public removeTask(id: string): void {
    const findTaskById = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== findTaskById.id);
  }
 */
}
