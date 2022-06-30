import { IsOptional, IsString } from 'class-validator';
export class GetPurchasesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
