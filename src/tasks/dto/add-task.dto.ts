/*
 * File: add-task-dto.ts
 * Project: nestjs-tasks
 * Created: Thursday, October 7th 2021, 2:20:33 pm
 * Last Modified: Tuesday, September 1st 2026, 6:15:36 pm
 * Copyright © 2021 AMDE Agência
 */

import { IsNotEmpty } from 'class-validator';

export class AddTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
