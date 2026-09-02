/*
 * File: tasks.repository.ts
 * Project: nestjs-tasks
 * Created: Tuesday, September 1st 2026, 4:22:50 pm
 * Last Modified: Wednesday, September 2nd 2026, 11:22:22 am
 * Copyright © 2026 AMDE Agência
 */

import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Task } from './task.entity';
import { AddTaskDto } from './dto/add-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
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

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const queryBuilder = this.createQueryBuilder('TASKS_REPOSITORY');

    /**
     * :status is a variable that must be passing
     * in the second args of andWhere, sort of mapping the values
     */
    if (status) {
      queryBuilder.andWhere('TASKS_REPOSITORY.status = :status', {
        status,
      });
    }

   /**
     * use LOWER to lowercase the value to avoid
     * sensitive case issue on search
     */ 
    if (search) {
      queryBuilder.andWhere(
        'LOWER(TASKS_REPOSITORY.title) LIKE LOWER(:search) OR LOWER(TASKS_REPOSITORY.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await queryBuilder.getMany();

    return tasks;
  }
}
