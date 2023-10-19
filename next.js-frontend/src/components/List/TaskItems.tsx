import { useState } from 'react';
//Components
import TaskTitle from './TaskTitle';
import TaskActions from './TaskActions';
import TaskDescription from './TaskDescription';
//Services
import taskService from '@/services/task.service';
//Types
import { TaskItemProps } from '@/types/TasksItems.types';
import { ShowDetails, Task, UseInputType } from '@/types/TasksItems.types';
//Hooks
import UseInput from '@/hooks/UseInput';

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [showDetails, setShowDetails] = useState<ShowDetails>({});
  const [checkboxState, setCheckboxState] = useState(task.state === 'DONE');
  const [editingTask, setEditingTask] = useState<string | null>(null);

  let newTitle: UseInputType = UseInput();
  let newDescription: UseInputType = UseInput();

  //Details Logic
  const toggleDetails = (taskId: string) => {
    setShowDetails((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  //Checbox Logic
  const toggleCheckbox = async () => {
    const newState = !checkboxState;
    setCheckboxState(newState);
    let newStatus = newState ? 'DONE' : 'PENDING';

    await taskService.updateTaskStatus(task.id, newStatus);
  };

  //Edition Logic
  const startEditing = () => {
    setEditingTask(task.id);
  };

  const stopEditing = () => {
    newTitle.clear();
    newDescription.clear();
    setEditingTask(null);
  };

  const editTask = async (taskId: string) => {
    if (newTitle.value && newDescription.value) {
      let editedTask: Task = {
        id: task.id,
        title: newTitle.value,
        description: newDescription.value,
        state: task.state,
      };
      await taskService.updateTask(taskId, editedTask);
      setEditingTask(null);
    }
  };

  //Delete Logic
  const handleDelete = async (taskId: string) => {
    await taskService.deleteTask(taskId);
  };

  return (
    <div className="bg-gray-200 p-4 mb-4 rounded relative mx-auto w-5/6 bg-blue shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <TaskTitle
          editing={editingTask === task.id}
          title={task.title}
          newTitle={newTitle}
          isChecked={checkboxState}
          onCheckboxChange={toggleCheckbox}
        />

        <TaskActions
          editing={editingTask}
          handleDelete={handleDelete}
          startEditing={startEditing}
          toggleDetails={toggleDetails}
          taskId={task.id}
          showDetails={showDetails}
        />
      </div>
      <TaskDescription
        editing={editingTask === task.id}
        newDescription={newDescription}
      />
      {showDetails[task.id] && (
        <div>
          <p>Descripcion: {task.description}</p>
          <p>Estado: {task.state}</p>
        </div>
      )}
      {editingTask === task.id && (
        <div className="flex justify-end justify-between mt-6">
          <button
            onClick={() => editTask(task.id)}
            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
          >
            Guardar
          </button>
          <button
            onClick={stopEditing}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
