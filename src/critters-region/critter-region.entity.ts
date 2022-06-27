import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Critter } from 'src/critters/critter.entity';
import { Region } from 'src/regions/region.entity';

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
