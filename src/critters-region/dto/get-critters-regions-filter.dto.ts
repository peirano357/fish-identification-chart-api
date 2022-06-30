import { IsOptional, IsString } from 'class-validator';
export class GetCrittersRegionsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
