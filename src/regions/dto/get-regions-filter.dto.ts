import { IsOptional, IsString } from 'class-validator';

export class GetRegionsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
