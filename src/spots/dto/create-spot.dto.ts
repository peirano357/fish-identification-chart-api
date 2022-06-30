import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSpotDto {
  @IsNotEmpty()
  @ApiProperty()
  spottedDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID('all', { each: true })
  critterId: string;

  @IsNotEmpty()
  @ApiProperty()
  latitude: number;

  @IsNotEmpty()
  @ApiProperty()
  longitude: number;
}
function UUIDVersion(UUIDVersion: any, arg1: { each: true }) {
  throw new Error('Function not implemented.');
}
