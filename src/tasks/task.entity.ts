/*
 * File: task.entity.ts
 * Project: nestjs-tasks
 * Created: Friday, July 22nd 2022, 7:29:31 am
 * Last Modified: Friday, July 22nd 2022, 7:34:24 am
 * Copyright © 2021 AMDE Agência
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';

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
