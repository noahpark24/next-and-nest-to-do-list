export interface TaskItemProps {
  task: Task;
}
export type ShowDetails = {
  [taskId: string]: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
};

export type UseInputType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  clear: () => void;
};

export type createTaskDto = {
  title: string;
  description: string;
};
