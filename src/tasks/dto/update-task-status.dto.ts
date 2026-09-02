/*
 * File: update-task-status.dto.ts
 * Project: nestjs-tasks
 * Created: Friday, July 8th 2022, 2:18:04 pm
 * Last Modified: Tuesday, September 1st 2026, 4:42:03 pm
 * Copyright © 2022 AMDE Agência
 */

import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus
}