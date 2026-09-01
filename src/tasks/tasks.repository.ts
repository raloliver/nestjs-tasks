/*
 * File: tasks.repository.ts
 * Project: nestjs-tasks
 * Created: Tuesday, September 1st 2026, 4:22:50 pm
 * Last Modified: Tuesday, September 1st 2026, 4:37:46 pm
 * Copyright © 2026 AMDE Agência
 */

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

export class TasksRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

