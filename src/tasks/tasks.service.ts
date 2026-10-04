/*
 * File: tasks.service.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:56:13 am
 * Last Modified: Wednesday, September 2nd 2026, 11:01:08 am
 * Copyright © 2021 AMDE Agência
 */

import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { AddTaskDto } from './dto/add-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private readonly tasksRepository: TasksRepository) {}

  public async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  public async getTaskById(id: string): Promise<Task> {
    const findTaskById = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!findTaskById) {
      throw new NotFoundException(`Task with ID ${id} was not found.`);
    }

    return findTaskById;
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  public addTask(addTaskDto: AddTaskDto): Promise<Task> {
    return this.tasksRepository.addTask(addTaskDto);
  }

  public async removeTask(id: string): Promise<void> {
    const deleteResult = await this.tasksRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} was not found.`);
    }
  }
}
