/*
 * File: app.module.ts
 * Project: nestjs-tasks
 * Created: Thursday, September 2nd 2021, 8:43:02 pm
 * Last Modified: Tuesday, September 1st 2026, 6:46:46 pm
 * Copyright © 2021 AMDE Agência
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
