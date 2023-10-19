import { Task, createTaskDto } from '@/types/TasksItems.types';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

class Tasks_Services {
  private static instace: Tasks_Services | null = null;

  static getInstance(): Tasks_Services {
    if (!Tasks_Services.instace) {
      Tasks_Services.instace = new Tasks_Services();
    }
    return Tasks_Services.instace;
  }

  async getAllTasks() {
    try {
      const response = await axios.get(`${apiUrl}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log('get all tasks error : ', error);
    }
  }

  async updateTaskStatus(taskId: string, newStatus: string) {
    try {
      await axios.patch(
        `${apiUrl}/${taskId}`,
        { state: newStatus },
        {
          withCredentials: true,
        }
      );
      return ' task status updated succesfully ';
    } catch (error: any) {
      console.log('update task status error : ', error.response.data.message);
    }
  }

  async updateTask(taskId: string, updatedTasks: Task) {
    try {
      await axios.put(`${apiUrl}/${taskId}`, updatedTasks, {
        withCredentials: true,
      });
      return 'task updated succesfully';
    } catch (error: any) {
      console.log('update task error : ', error.response.data.message);
    }
  }

  async createTask(newTask: createTaskDto) {
    try {
      await axios.post(`${apiUrl}`, newTask, { withCredentials: true });
      return 'Task Created Succesfully';
    } catch (error: any) {
      console.log('create task error : ', error.response.data.message);
    }
  }

  async deleteTask(taskId: string) {
    try {
      await axios.delete(`${apiUrl}/${taskId}`, { withCredentials: true });
      return 'task deleted succesfully';
    } catch (error: any) {
      console.log('delete task error : ', error.response.data.message);
    }
  }
}

export default Tasks_Services.getInstance();
