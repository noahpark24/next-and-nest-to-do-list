import { Test, TestingModule } from '@nestjs/testing';
//Service
import { TasksService } from '../src/tasks/tasks.service';
//Model
import { TasksModel } from '../src/tasks/tasks.model';
//Sequelize
import { SequelizeModule } from '@nestjs/sequelize';
//Utils
import { createTestTask } from '../src/utils/testing/functions';
import { DbConectionConfig } from '../src/utils/config/db.connection.config';

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbConectionConfig, SequelizeModule.forFeature([TasksModel])],
      providers: [TasksService, TasksModel],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    const newTask = await createTestTask();
    taskId = newTask.id;
  });

  afterAll(async () => {
    await TasksModel.destroy({
      where: {},
      truncate: true,
    });
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const result = await tasksService.getAllTasks();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getTaskById', () => {
    it('should return a task with a valid ID', async () => {
      const task = await tasksService.getTaskById(taskId);

      expect(task).toBeDefined();
      expect(task.id).toBe(taskId);
    });

    it('should return undefined or null with an invalid ID', async () => {
      const invalidTaskId = '9';
      try {
        const task = await tasksService.getTaskById(invalidTaskId);
        expect(task).toBeNull();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = await tasksService.createTask(
        'Test Task',
        'Test Description',
      );
      expect(newTask).toBeDefined();
      expect(newTask.title).toBe('Test Task');
      expect(newTask.description).toBe('Test Description');
    });
  });

  describe('Get Task By Title', () => {
    it('should return a task with the matched title', async () => {
      const task = await tasksService.getTaskByTitle('Tarea de prueba');
      expect(task).not.toBeNull();
      expect(task).not.toBeUndefined();
    });

    it('should return null or undefined with a unexistent title', async () => {
      try {
        const task = await tasksService.getTaskById('lavar el dinosaurio');
        expect(task).toBeNull();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const updatedFields = {
        title: 'Updated Task',
        description: 'Updated Description',
      };

      const updatedTask = await tasksService.updateTask(taskId, updatedFields);

      expect(updatedTask).toBeDefined();
      expect(updatedTask.title).toBe(updatedFields.title);
      expect(updatedTask.description).toBe(updatedFields.description);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const result = await tasksService.deleteTask(taskId);

      expect(result).toBe('task deleted succesfully');

      const deletedTask = await tasksService.getTaskById(taskId);
      expect(deletedTask).toBeNull;
    });
  });
});
