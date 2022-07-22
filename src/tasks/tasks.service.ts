/*
 * File: tasks.service.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 6:56:13 am
 * Last Modified: Friday, July 8th 2022, 2:21:24 pm
 * Copyright © 2021 AMDE Agência
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { AddTaskDtoTaskDto } from './dto/add-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * #TODO: replace this method by ORM
   */
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

  /**
   * #TODO: replace this method by ORM
   */
  public getTaskById(id: string): Task {
    const findTaskById = this.tasks.find((task) => task.id === id);

    if (!findTaskById) {
      throw new NotFoundException(`Task with ID ${id} was not found.`);
    }

    return findTaskById;
  }

  /**
   * #TODO: replace this method by ORM and avoid mutability
   */
  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  public addTask(addTaskDto: AddTaskDtoTaskDto): Task {
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

  /**
   * #TODO: replace this method by ORM
   * This is not a good practice, use a ORM and refactor this
   */
  public removeTask(id: string): void {
    const findTaskById = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== findTaskById.id);
  }
}
