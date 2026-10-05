/*
 * File: auth.service.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:16:15 am
 * Last Modified: Monday, October 5th 2026, 8:38:12 am
 * Copyright © 2026 AMDE Agência
 */

import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
}
