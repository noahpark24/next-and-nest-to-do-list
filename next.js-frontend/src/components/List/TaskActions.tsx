import React from 'react';
import {
  BsPencilSquare,
  BsArrowUpCircle,
  BsArrowDownCircle,
  BsTrash,
} from 'react-icons/bs';
import { ShowDetails } from '@/types/TasksItems.types';

interface TaskActionsProps {
  editing: string | null;
  startEditing: (taskId: string) => void;
  toggleDetails: (taskId: string) => void;
  handleDelete: (taskId: string) => void;
  taskId: string;
  showDetails: ShowDetails;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  editing,
  startEditing,
  toggleDetails,
  handleDelete,
  taskId,
  showDetails,
}) => {
  if (editing === null) {
    return (
      <div className="flex items-center">
        <div
          className="cursor-pointer mr-2"
          onClick={() => startEditing(taskId)}
        >
          <BsPencilSquare />
        </div>
        <div
          className="cursor-pointer mr-2"
          onClick={() => handleDelete(taskId)}
        >
          <BsTrash />
        </div>
        <div className="cursor-pointer" onClick={() => toggleDetails(taskId)}>
          {!showDetails[taskId] ? <BsArrowUpCircle /> : <BsArrowDownCircle />}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TaskActions;
