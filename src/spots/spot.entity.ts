import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Critter } from 'src/critters/critter.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('spot')
export class Spot {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'text' })
  userId: string;

  @ApiProperty()
  @Column({ type: 'text' })
  critterId: string;

  @ApiProperty()
  @Column({ type: 'float' })
  latitude: number;

  @ApiProperty()
  @Column({ type: 'float' })
  longitude: number;

  @ApiProperty()
  @Column()
  spottedDate: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ApiProperty({ type: User })
  user?: User;

  @ManyToOne(() => Critter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'critterId', referencedColumnName: 'id' })
  critter?: Critter;
}
