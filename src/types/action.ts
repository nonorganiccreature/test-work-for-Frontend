export interface Action {
  id: number;
  time: Date;
}

export interface TaskAction extends Action {
  type:
    | "deleted"
    | "created"
    | "startDeletion"
    | "completed"
    | "uncompleted"
    | "cancelDeletion";
  title: string;
}
