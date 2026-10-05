/*
 * File: user.entity.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:20:01 am
 * Last Modified: Monday, October 5th 2026, 8:24:25 am
 * Copyright © 2026 AMDE Agência
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
