/*
 * File: get-tasks-filter-dto.ts
 * Project: nestjs-tasks
 * Created: Friday, October 8th 2021, 6:19:35 am
 * Last Modified: Tuesday, September 1st 2026, 4:42:03 pm
 * Copyright © 2021 AMDE Agência
 */

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
