import CreateTask from '@/components/AddTask/CreateTask';
import React from 'react';

const AddTask = () => {
  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="list-wrapper">
        {/*Header*/}
        <div className="header text-center mb-4 rounded-md p-2 font-bold  text-2xl text-white">
          <h1>Add New Task</h1>
        </div>
        <CreateTask />
      </div>
    </div>
  );
};

export default AddTask;
