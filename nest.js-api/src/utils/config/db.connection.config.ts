import { SequelizeModule } from '@nestjs/sequelize';
import { TasksModel } from 'src/tasks/tasks.model';
export const DbConectionConfig = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [TasksModel],
  autoLoadModels: true,
  synchronize: true,
});
