/*
 * File: get-tasks-filter-dto.ts
 * Project: nestjs-tasks
 * Created: Friday, October 8th 2021, 6:19:35 am
 * Last Modified: Friday, October 8th 2021, 6:20:34 am
 * Copyright © 2021 AMDE Agência
 */

import { TaskStatus } from '../task.model';

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
