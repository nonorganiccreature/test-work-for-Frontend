import type { TaskDTO } from "@/types/dto";

export class Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;

  constructor({
    id,
    title,
    completed,
    completedAt,
    createdAt,
    updatedAt,
  }: TaskDTO) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.completedAt = completedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    return this;
  }

  toggleTask(onCompleted: () => void, onUncompleted: () => void) {
    this.completed = !this.completed;

    this.updatedAt = new Date();
    this.completedAt = this.completed ? new Date() : null;

    if (this.completed) {
      onCompleted();
    }

    if (!this.completed) {
      onUncompleted();
    }
  }
}
