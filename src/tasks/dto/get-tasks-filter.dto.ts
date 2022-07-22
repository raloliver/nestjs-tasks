/*
 * File: get-tasks-filter-dto.ts
 * Project: nestjs-tasks
 * Created: Friday, October 8th 2021, 6:19:35 am
 * Last Modified: Friday, July 8th 2022, 2:34:53 pm
 * Copyright © 2021 AMDE Agência
 */

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
