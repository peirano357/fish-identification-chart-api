import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePurchaseDto {
  @IsNumber()
  @ApiProperty()
  purchasedDate: Date;
}
