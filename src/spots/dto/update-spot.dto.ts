import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class UpdateSpotDto {
  @IsNumber()
  @ApiProperty()
  spottedDate: Date;
}
