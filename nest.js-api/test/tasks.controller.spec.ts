import { Test, TestingModule } from '@nestjs/testing';
//Controller
import { TasksController } from '../src/tasks/tasks.controller';
//Services
import { TasksService } from '../src/tasks/tasks.service';
import { ResponsesService } from '../src/app.services';
//Model
import { TasksModel } from '../src/tasks/tasks.model';
//Entity And Dto
import { TaskStatus } from '../src/tasks/task.entity';
import { CreateTaskDto } from '../src/tasks/dto/task.dto';
//Sequelize
import { SequelizeModule } from '@nestjs/sequelize';
//Utils
import { createTasks, mockResponse } from 'src/utils/testing/functions';
import { DbConectionConfig } from '../src/utils/config/db.connection.config';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;
  let responsesService: ResponsesService;
  let mockTasks: TasksModel[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbConectionConfig, SequelizeModule.forFeature([TasksModel])],
      controllers: [TasksController],
      providers: [TasksService, ResponsesService, TasksModel],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
    responsesService = module.get<ResponsesService>(ResponsesService);

    mockTasks = await createTasks();
  });

  afterAll(async () => {
    await TasksModel.destroy({
      where: {},
      truncate: true,
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const sendAllTasksMock = jest.spyOn(responsesService, 'sendAllTasks');

      const errorMock = jest.spyOn(responsesService, 'error');

      jest.spyOn(tasksService, 'getAllTasks').mockResolvedValue(mockTasks);

      await tasksController.getAllTasks(mockResponse);

      expect(tasksService.getAllTasks).toHaveBeenCalled();

      expect(sendAllTasksMock).toHaveBeenCalledWith(
        mockResponse,
        mockTasks,
        200,
      );

      expect(errorMock).not.toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const errorMessage = 'An error occurred';

      jest
        .spyOn(tasksService, 'getAllTasks')
        .mockRejectedValue(new Error(errorMessage));
      await tasksController.getAllTasks(mockResponse);

      expect(tasksService.getAllTasks).toHaveBeenCalled();

      expect(mockResponse.status).toHaveBeenCalledWith(500);

      expect(mockResponse.send).toHaveBeenCalledWith({
        error: errorMessage,
      });
    });
  });

  describe('Creating A Task', () => {
    it('should create a new task', async () => {
      const newTask: CreateTaskDto = {
        title: 'Nueva Tarea',
        description: 'Tarea Nueva De Prueba',
      };

      const createTaskMock = jest.spyOn(tasksService, 'createTask');

      const succesMessageMock = jest.spyOn(responsesService, 'success');

      try {
        await tasksController.createTask(mockResponse, newTask);

        expect(createTaskMock).toHaveBeenCalledWith(
          newTask.title,
          newTask.description,
        );

        expect(succesMessageMock).toHaveBeenCalledWith(
          mockResponse,
          'task created successfully',
          201,
        );
      } catch (error) {
        expect(error).not.toBeDefined();
      }
    });

    it('should handle error if task with same title already exists', async () => {
      tasksService.getTaskByTitle = jest.fn().mockResolvedValue(mockTasks[0]);
      try {
        await tasksController.createTask(mockResponse, mockTasks[0]);

        expect(tasksService.getTaskByTitle).toHaveBeenCalledWith(
          'Tarea de prueba 1',
        );
      } catch (error) {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(
          'Task with same title already exists',
        );
      }
    });

    describe('deleteTask', () => {
      it('should delete an existing task', async () => {
        const deleteTaskMock = jest.spyOn(tasksService, 'deleteTask');
        const succesMessageMock = jest.spyOn(responsesService, 'success');

        try {
          await tasksController.deleteTask(mockResponse, mockTasks[0].id);

          expect(deleteTaskMock).toHaveBeenCalledWith(mockTasks[0].id);

          expect(succesMessageMock).toHaveBeenCalledWith(
            mockResponse,
            'Task Deleted Succesfully',
            204,
          );
        } catch (error) {
          expect(error).toBeUndefined();
        }
      });

      it('should give an error with an invalid id', async () => {
        const deleteTaskMock = jest.spyOn(tasksService, 'deleteTask');
        const errorMessageMock = jest.spyOn(responsesService, 'error');

        try {
          await tasksController.deleteTask(mockResponse, '1');

          expect(deleteTaskMock).toHaveBeenCalledWith('1');
        } catch (error) {
          expect(errorMessageMock).toHaveBeenCalledWith(
            mockResponse,
            'Invalid Id',
            500,
          );

          expect(error).toBeDefined();
        }
      });

      describe('updatingTask', () => {
        it('should update an existing task', async () => {
          const updatedFields: CreateTaskDto = {
            title: 'updated title',
            description: 'updated description',
          };

          const succesMessageMock = jest.spyOn(responsesService, 'success');
          const updateTaskMock = jest.spyOn(tasksService, 'updateTask');

          try {
            await tasksController.updateTask(
              mockResponse,
              mockTasks[0].id,
              updatedFields,
            );

            expect(updateTaskMock).toHaveBeenCalledWith(
              mockTasks[0].id,
              updatedFields,
            );
            expect(succesMessageMock).toBeCalledWith(
              mockResponse,
              'Task Updated Succesfully',
              200,
            );
          } catch (error) {
            expect(error).toBeUndefined();
          }
        });

        it('should fail with an invalid id', async () => {
          const updatedFields: CreateTaskDto = {
            title: 'updated title',
            description: 'updated description',
          };

          const errorMessageMock = jest.spyOn(responsesService, 'error');
          const updateTaskMock = jest.spyOn(tasksService, 'updateTask');

          try {
            await tasksController.updateTask(mockResponse, '1', updatedFields);

            expect(updateTaskMock).toHaveBeenCalledWith('1', updatedFields);
          } catch (error) {
            expect(error).toBeDefined();
            expect(errorMessageMock).toBeCalledWith(
              mockResponse,
              'invalid id',
              500,
            );
          }
        });
      });

      describe('updateTaskStatus', () => {
        it('should update the task status', async () => {
          const updateTaskStatusMock = jest.spyOn(tasksService, 'updateTask');

          try {
            await tasksController.updateTaskStatus(
              mockResponse,
              mockTasks[0].id,
              { status: TaskStatus.DONE },
            );

            expect(updateTaskStatusMock).toHaveBeenCalledWith(mockTasks[0].id, {
              status: TaskStatus.DONE,
            });
          } catch (error) {
            expect(error).toBeUndefined();
          }
        });
      });
    });
  });
});
