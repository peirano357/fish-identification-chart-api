import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateSpotDto {
  @IsNumber()
  @ApiProperty()
  spottedDate: Date;
}
