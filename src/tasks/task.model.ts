/*
 * File: task.model.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 7:14:50 am
 * Last Modified: Thursday, October 7th 2021, 6:31:36 am
 * Copyright © 2021 AMDE Agência
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
