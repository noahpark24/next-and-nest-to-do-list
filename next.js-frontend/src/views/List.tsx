'use client';
import '@/styles/views/List.css';
import React, { useEffect, useState } from 'react';
import TaskItem from '@/components/List/TaskItems';
//Services
import taskService from '@/services/task.service';
//Types
import { Task } from '@/types/TasksItems.types';
import Pagination from '@/components/List/Pagination';

const List = () => {
  const [filter, setFilter] = useState('ALL');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage: number = 4;

  useEffect(() => {
    const getTasks = async () => {
      let response = await taskService.getAllTasks();
      setTasks(response.tasks);
    };
    getTasks();
  }, [tasks]);

  //Filter logic
  const filterTasks = (filter: string) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'ALL') return true;
    return task.state === filter;
  });

  //Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;

  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex  items-center justify-center mx-auto">
      <div className="list-wrapper">
        {/*List Header*/}
        <div className="header text-center mb-4 rounded-md text-white font-bold text-2xl p-2">
          <h1>Nest and Next To Do list</h1>
        </div>

        {/*Filter Buttons*/}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => filterTasks('ALL')}
            className={`filter-button text-base mr-3 p-2 px-4 focus:outline-none rounded-md ${
              filter === 'ALL' ? 'all text-white bg-blue-600' : ''
            }`}
          >
            All
          </button>
          <button
            onClick={() => filterTasks('PENDING')}
            className={`filter-button ${
              filter === 'PENDING' ? 'pending text-white bg-blue-600' : ''
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => filterTasks('DONE')}
            className={`filter-button ${
              filter === 'DONE' ? 'complete text-white bg-blue-600' : ''
            }`}
          >
            Complete
          </button>
        </div>

        {/*Tasks List*/}
        <div className="task-container">
          {currentTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        {/*Pagination*/}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default List;
