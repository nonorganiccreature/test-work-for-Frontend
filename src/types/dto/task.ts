import type { DTO } from "./dto";

export interface TaskDTO extends DTO {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}
