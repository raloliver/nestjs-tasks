/*
 * File: add-task-dto.ts
 * Project: nestjs-tasks
 * Created: Thursday, October 7th 2021, 2:20:33 pm
 * Last Modified: Tuesday, July 5th 2022, 6:42:04 am
 * Copyright © 2021 AMDE Agência
 */

import { IsNotEmpty } from 'class-validator';

export class AddTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
