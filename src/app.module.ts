/*
 * File: app.module.ts
 * Project: nestjs-tasks
 * Created: Thursday, September 2nd 2021, 8:43:02 pm
 * Last Modified: Sunday, October 4th 2026, 1:16:27 pm
 * Copyright © 2021 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'task'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('DB_SYNC', 'true') === 'true',
      }),
    }),
    TasksModule,
  ],
})
export class AppModule {}
