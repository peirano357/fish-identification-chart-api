import { IsOptional, IsString } from 'class-validator';

export class GetSpotsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
