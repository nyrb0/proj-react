export interface ListI {
  title: string;
  desc: string;
  id: number;
  status_work: TypeTaskStatus;
}

export type TypeTaskStatus = "inProgress" | "notDone" | "done";

export type TypeCategotyStatus = TypeTaskStatus | "all";

export type TypeListFormState = Omit<ListI, "id">;
