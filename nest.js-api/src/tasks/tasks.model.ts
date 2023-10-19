import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'tasks',
})
export class TasksModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    validate: {
      isIn: [['PENDING', 'IN_PROGRESS', 'DONE']],
    },
    defaultValue: 'PENDING',
  })
  state: string;
}
