import React from 'react';
import { UseInputType } from '@/types/TasksItems.types';

interface TaskTitleProps {
  editing: boolean;
  title?: string;
  newTitle: UseInputType;
  isChecked: boolean;
  onCheckboxChange?: () => void;
}

const TaskTitle: React.FC<TaskTitleProps> = ({
  editing,
  title,
  newTitle,
  isChecked,
  onCheckboxChange,
}) => {
  return (
    <div className="flex items-center">
      {editing ? (
        <div className="w-full mb-2">
          <label className="font-semibold">Titulo :</label>
          <input
            type="text"
            {...newTitle}
            className="w-full border p-1"
            placeholder="Ingrese Un Titulo"
          />
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={isChecked}
            className="mr-2"
            onChange={onCheckboxChange}
          />
          <h2 className="flex-1">{title}</h2>
        </>
      )}
    </div>
  );
};

export default TaskTitle;
