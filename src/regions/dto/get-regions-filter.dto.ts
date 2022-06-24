import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetRegionsFilterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
