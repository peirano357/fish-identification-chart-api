import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCritterRegionDto {
  @IsNotEmpty()
  @ApiProperty()
  sort: number;

  @IsNotEmpty()
  @ApiProperty()
  critterId: string;

  @IsNotEmpty()
  @ApiProperty()
  regionId: string;
}
