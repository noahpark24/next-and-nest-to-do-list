'use client';
import React from 'react';
import UseInput from '@/hooks/UseInput';
import { UseInputType, createTaskDto } from '@/types/TasksItems.types';
import TaskDescription from '@/components/List/TaskDescription';
import TaskTitle from '@/components/List/TaskTitle';
import taskService from '@/services/task.service';

const CreateTask = () => {
  let title: UseInputType = UseInput();
  let description: UseInputType = UseInput();

  const handleCreateTask = async () => {
    if (title.value && description.value) {
      let newTask: createTaskDto = {
        title: title.value,
        description: description.value,
      };
      await taskService.createTask(newTask);
      title.clear();
      description.clear();
    }
  };
  return (
    <>
      <TaskTitle editing={true} newTitle={title} isChecked={false} />
      <TaskDescription editing={true} newDescription={description} />
      <div className="flex justify-center text-center">
        <button
          onClick={handleCreateTask}
          className="rounded-lg w-full text-white font-bold bg-blue-500"
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default CreateTask;
