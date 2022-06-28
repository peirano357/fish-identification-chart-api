import { ApiProperty } from '@nestjs/swagger';
import { Critter } from '../critters/critter.entity';
import { Region } from '../regions/region.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('critter-region')
export class CritterRegion {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'text' })
  critterId: string;

  @ApiProperty()
  @Column({ type: 'text' })
  regionId: string;

  @ApiProperty()
  @Column()
  sort: number;

  @ManyToOne(() => Critter)
  @JoinColumn({ name: 'critterId', referencedColumnName: 'id' })
  @ApiProperty({ type: Critter })
  critter?: Critter;

  @ManyToOne(() => Region, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'regionId', referencedColumnName: 'id' })
  @ApiProperty({ type: Region })
  region?: Region;
}
