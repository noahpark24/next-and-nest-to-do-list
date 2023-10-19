import { UseInputType } from '@/types/TasksItems.types';
import React from 'react';

interface TaskDescriptionProps {
  editing: boolean;
  newDescription: UseInputType;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({
  editing,
  newDescription,
}) => {
  return (
    <div className="flex items-center">
      {editing ? (
        <div className="w-full mb-2">
          <label className="font-semibold">Descripcion :</label>
          <input
            type="text"
            {...newDescription}
            className="w-full border p-1"
            placeholder="Ingrese Una Descripcion De La Tarea"
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TaskDescription;
