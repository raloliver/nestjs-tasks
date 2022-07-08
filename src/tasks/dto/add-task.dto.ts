/*
 * File: add-task-dto.ts
 * Project: nestjs-tasks
 * Created: Thursday, October 7th 2021, 2:20:33 pm
 * Last Modified: Friday, July 8th 2022, 2:18:48 pm
 * Copyright © 2021 AMDE Agência
 */

import { IsNotEmpty } from 'class-validator';

export class AddTaskDtoTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
