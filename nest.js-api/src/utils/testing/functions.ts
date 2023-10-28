import { TasksModel } from '../../../src/tasks/tasks.model';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const createTasks = async () => {
  const newTasks = await TasksModel.bulkCreate([
    {
      id: uuidv4(),
      title: 'Tarea de prueba 1',
      description: 'Descripción de la tarea 1',
      state: 'pending',
    },
    {
      id: uuidv4(),
      title: 'Tarea de prueba 2',
      description: 'Descripción de la tarea 2',
      state: 'completed',
    },
  ]);
  return newTasks;
};

export async function createTestTask() {
  const task = await TasksModel.create({
    title: 'Tarea de prueba',
    description: 'Descripción de prueba',
    state: 'PENDING',
  });
  return task;
}

export const mockResponse = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as Response;
