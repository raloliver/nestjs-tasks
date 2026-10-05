/*
 * File: users.repository.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:23:03 am
 * Last Modified: Monday, October 5th 2026, 4:36:24 pm
 * Copyright © 2026 AMDE Agência
 */

import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  private ERROR_CODE = '23505';

  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error: any) {
      if (error?.code === this.ERROR_CODE) {
        throw new ConflictException('Username is already taken');
      }

      throw new InternalServerErrorException();
    }
  }
}
