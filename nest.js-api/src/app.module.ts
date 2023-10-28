import { Module } from '@nestjs/common';
//Modules
import { TasksModule } from './tasks/tasks.module';
//Services
import { ResponsesService } from './app.services';
//Config
import { config } from 'dotenv';
import { DbConectionConfig } from './utils/config/db.connection.config';
config();

@Module({
  imports: [TasksModule, DbConectionConfig],
  controllers: [],
  providers: [ResponsesService],
})
export class AppModule {}
