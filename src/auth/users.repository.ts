/*
 * File: users.repository.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:23:03 am
 * Last Modified: Monday, October 5th 2026, 9:23:48 am
 * Copyright © 2026 AMDE Agência
 */

import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({ username, password });

    await this.save(user);
  }
}
