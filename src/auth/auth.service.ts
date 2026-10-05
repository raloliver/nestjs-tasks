/*
 * File: auth.service.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:16:15 am
 * Last Modified: Monday, October 5th 2026, 4:59:21 pm
 * Copyright © 2026 AMDE Agência
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'done';
    }

    throw new UnauthorizedException(
      'Please, check your credentials and try again',
    );
  }
}
