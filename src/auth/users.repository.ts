/*
 * File: users.repository.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:23:03 am
 * Last Modified: Monday, October 5th 2026, 8:24:21 am
 * Copyright © 2026 AMDE Agência
 */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';
import { User } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
