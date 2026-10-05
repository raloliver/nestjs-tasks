/*
 * File: auth.module.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:02:16 am
 * Last Modified: Monday, October 5th 2026, 9:22:08 am
 * Copyright © 2026 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
