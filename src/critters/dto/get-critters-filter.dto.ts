import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCritterFilterDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  search?: string;
}
