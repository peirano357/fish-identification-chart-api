import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSpotDto {
  @IsNotEmpty()
  @ApiProperty()
  spottedDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  critterId: string;

  @IsNotEmpty()
  @ApiProperty()
  latitude: number;

  @IsNotEmpty()
  @ApiProperty()
  longitude: number;
}
