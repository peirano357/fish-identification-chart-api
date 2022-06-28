import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('critter')
export class Critter {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  imageUrl: string;

  constructor(name?: string, description?: string, imageUrl?: string) {
    this.name = name || '';
    this.description = description || '';
    this.imageUrl = imageUrl || '';
  }
}
