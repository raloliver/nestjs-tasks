/*
 * File: task.entity.ts
 * Project: nestjs-tasks
 * Created: Friday, July 22nd 2022, 7:29:31 am
 * Last Modified: Tuesday, September 1st 2026, 4:42:03 pm
 * Copyright © 2021 AMDE Agência
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

/**
 * This decorator defines this class is a Entity
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
