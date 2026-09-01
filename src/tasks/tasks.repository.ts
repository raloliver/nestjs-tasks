/*
 * File: tasks.repository.ts
 * Project: nestjs-tasks
 * Created: Tuesday, September 1st 2026, 4:22:50 pm
 * Last Modified: Tuesday, September 1st 2026, 6:54:03 pm
 * Copyright © 2026 AMDE Agência
 */

import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';

import { AddTaskDto } from './dto/add-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async addTask(addTaskDto: AddTaskDto): Promise<Task> {
    const { title, description } = addTaskDto;
    const task = this.create({ title, description, status: TaskStatus.OPEN });

    return this.save(task);
  }
}
