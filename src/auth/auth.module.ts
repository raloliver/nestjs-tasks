/*
 * File: auth.module.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:02:16 am
 * Last Modified: Monday, October 5th 2026, 8:36:03 am
 * Copyright © 2026 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
