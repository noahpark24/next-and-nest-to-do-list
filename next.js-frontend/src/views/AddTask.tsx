import CreateTask from '@/components/AddTask/CreateTask';
import React from 'react';

const AddTask = () => {
  return (
    <div className="container mx-auto">
      <div className="list-wrapper">
        {/*Header*/}
        <div className="header">
          <h1>Add New Task</h1>
        </div>
        <CreateTask />
      </div>
    </div>
  );
};

export default AddTask;
