/*
 * File: user.entity.ts
 * Project: nestjs-tasks
 * Created: Monday, October 5th 2026, 8:20:01 am
 * Last Modified: Monday, October 5th 2026, 4:18:25 pm
 * Copyright © 2026 AMDE Agência
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
