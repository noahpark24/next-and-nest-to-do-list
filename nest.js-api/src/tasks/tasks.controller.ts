import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
//Services
import { TasksService } from './tasks.service';
import { ResponsesService } from 'src/app.services';
//Data Transfer Objects
import {
  CreateTaskDto,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private taskServices: TasksService,
    private responses: ResponsesService,
  ) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    try {
      const allTasks = await this.taskServices.getAllTasks();
      return this.responses.sendAllTasks(res, allTasks, 200);
    } catch (error) {
      this.responses.error(res, error, 500);
    }
  }

  @Post()
  async createTask(@Res() res: Response, @Body() newTask: CreateTaskDto) {
    try {
      const validation = await this.taskServices.getTaskByTitle(newTask.title);
      if (!validation) {
        await this.taskServices.createTask(newTask.title, newTask.description);
        this.responses.success(res, 'task created successfully', 201);
      }
    } catch (error) {
      this.responses.error(res, error, 500);
    }
  }

  @Delete(':id')
  async deleteTask(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.taskServices.deleteTask(id);
      this.responses.success(res, 'Task Deleted Succesfully', 204);
    } catch (error) {
      this.responses.error(res, error, 500);
    }
  }

  @Put(':id')
  async updateTask(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updatedFields: UpdateTaskDto,
  ) {
    try {
      await this.taskServices.updateTask(id, updatedFields);
      this.responses.success(res, 'Task Updated Succesfully', 200);
    } catch (error) {
      this.responses.error(res, error, 500);
    }
  }

  @Patch(':id')
  async updateTaskStatus(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() newStatus: UpdateTaskStatusDto,
  ) {
    try {
      await this.taskServices.updateTask(id, newStatus);
      this.responses.success(res, 'Task Updated Succesfully', 200);
    } catch (error) {
      this.responses.error(res, error, 500);
    }
  }
}
