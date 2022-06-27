//import { Task } from 'src/tasks/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeEnum } from './enum/user-type.enum';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ApiProperty({
    enum: ['administrator', 'customer'],
    enumName: 'UserTypeEnum',
  })
  @Column({
    type: 'enum',
    enum: UserTypeEnum,
    enumName: 'UserTypeEnum',
    nullable: true,
  })
  userType?: UserTypeEnum;

  /*
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
  */
}
