import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//Models
import { TasksModel } from './tasks.model';
//DatA Transfer Objects
import { UpdateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TasksModel)
    private taskModel: typeof TasksModel,
  ) {}

  async getAllTasks() {
    const allTasks = await this.taskModel.findAll();
    return allTasks;
  }

  async getTaskById(id: string) {
    const task = await this.taskModel.findByPk(id);
    return task;
  }

  async getTaskByTitle(title: string) {
    const task = await this.taskModel.findOne({ where: { title: title } });
    return task;
  }

  async createTask(title: string, description: string) {
    const validation = await this.getTaskByTitle(title);
    if (!validation) {
      const newTask = await this.taskModel.create({ title, description });
      return newTask;
    }
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto) {
    const updatedTask = await this.taskModel.update(updatedFields, {
      where: {
        id: id,
      },
      returning: true,
    });
    return updatedTask[1][0];
  }

  async deleteTask(id: string) {
    await this.taskModel.destroy({ where: { id: id } });
    return 'task deleted succesfully';
  }
}
