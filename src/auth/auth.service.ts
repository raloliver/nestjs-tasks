/*
 * File: auth.service.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:16:15 am
 * Last Modified: Monday, October 5th 2026, 9:20:46 am
 * Copyright © 2026 AMDE Agência
 */

import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }
}
