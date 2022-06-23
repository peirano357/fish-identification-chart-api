import { IsOptional, IsString } from 'class-validator';

export class GetCritterFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
