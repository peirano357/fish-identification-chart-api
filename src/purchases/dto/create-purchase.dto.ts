import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatePurchaseDto {
  @IsNotEmpty()
  @ApiProperty()
  purchasedDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  regionId: string;
}
