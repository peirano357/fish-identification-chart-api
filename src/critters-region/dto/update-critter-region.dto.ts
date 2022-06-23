import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCritterRegionDto {
  @IsNumber()
  @ApiProperty()
  sort: number;
}
