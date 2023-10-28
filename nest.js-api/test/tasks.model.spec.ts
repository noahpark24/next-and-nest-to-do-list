import { Test } from '@nestjs/testing';
//Model
import { TasksModel } from '../src/tasks/tasks.model';
//Config
import { DbConectionConfig } from '../src/utils/config/db.connection.config';

describe('TasksModel', () => {
  let model: typeof TasksModel;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [DbConectionConfig],
      providers: [TasksModel],
    }).compile();

    model = TasksModel;
  });

  afterAll(async () => {
    await TasksModel.destroy({
      where: {},
      truncate: true,
    });
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
  });

  it('should create a task', async () => {
    const task = await model.create({
      title: 'Tarea de prueba',
      description: 'Descripción de prueba',
      state: 'PENDING',
    });

    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Tarea de prueba');
    expect(task.description).toBe('Descripción de prueba');
    expect(task.state).toBe('PENDING');
  });

  it('should not allow null title', async () => {
    try {
      await model.create({
        title: null,
        description: 'Descripción de prueba',
        state: 'PENDING',
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should not allow duplicated titles', async () => {
    try {
      await model.create({
        title: 'prueba1',
        description: 'Descripción de prueba',
        state: 'PENDING',
      });
      await model.create({
        title: 'prueba1',
        description: 'Descripción de prueba',
        state: 'PENDING',
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
