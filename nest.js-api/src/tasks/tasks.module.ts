import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
//Tasks Components
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksModel } from './tasks.model';
//Services
import { ResponsesService } from 'src/app.services';

@Module({
  imports: [SequelizeModule.forFeature([TasksModel])],
  controllers: [TasksController],
  providers: [TasksService, ResponsesService],
})
export class TasksModule {}
