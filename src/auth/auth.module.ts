/*
 * File: auth.module.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:02:16 am
 * Last Modified: Saturday, October 17th 2026, 5:52:13 pm
 * Copyright © 2026 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_ACCESS_SECRET');

        if (!secret) {
          throw new Error('OPS! There is an error on the environment.');
        }

        return {
          secret,
          signOptions: {
            expiresIn: 900,
          },
        };
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
