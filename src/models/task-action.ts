export class TaskAction {
  id: number;
  time: Date;
  type:
    | "deleted"
    | "created"
    | "startDeletion"
    | "completed"
    | "uncompleted"
    | "cancelDeletion";
  title: string;

  constructor(dto: TaskAction) {
    this.id = dto.id;
    this.time = dto.time;
    this.type = dto.type;
    this.title = dto.title;
  }
}
