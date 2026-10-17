/*
 * File: auth.module.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:02:16 am
 * Last Modified: Saturday, October 17th 2026, 5:10:02 pm
 * Copyright © 2026 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: 900,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
