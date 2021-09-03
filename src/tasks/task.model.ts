/*
 * File: task.model.ts
 * Project: nestjs-tasks
 * Created: Friday, September 3rd 2021, 7:14:50 am
 * Last Modified: Friday, September 3rd 2021, 7:18:17 am
 * Copyright © 2021 AMDE Agência
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
