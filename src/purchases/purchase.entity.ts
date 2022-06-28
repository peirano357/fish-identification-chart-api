import { ApiProperty } from '@nestjs/swagger';
import { User } from '../auth/user.entity';
import { Region } from '../regions/region.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('purchase')
export class Purchase {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'text' })
  userId: string;

  @ApiProperty()
  @Column({ type: 'text' })
  regionId: string;

  @ApiProperty()
  @Column()
  purchasedDate: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ApiProperty({ type: User })
  user?: User;

  @ManyToOne(() => Region, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'regionId', referencedColumnName: 'id' })
  @ApiProperty({ type: Region })
  region?: Region;
}
