import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { string } from '@hapi/joi';
import { Purchase } from 'src/purchases/purchase.entity';
import { PurchasesService } from 'src/purchases/purchases.service';

@Controller('purchases')
@UseGuards(AuthGuard())
@ApiTags('Purchases')
export class PurchasesController {
  private logger = new Logger('PurchasesController');

  constructor(
    private configService: ConfigService,
    private purchasesService: PurchasesService,
  ) {}

  /** PERFORMS A REGION CHART PURCHASE FOR A GIVEN USER*/
  @Post('/')
  @ApiOperation({
    summary:
      'Performs a region chart purchase for a given user. (Requires administrator credentials)',
  })
  @ApiResponse({
    type: Purchase,
    isArray: false,
    status: 201,
    description: 'Region chart successfully purchased for user',
  })
  addPurchase(
    @Body() purchase: Purchase,
    @GetUser() user: User,
  ): Promise<Purchase> {
    return this.purchasesService.createPurchase(purchase, user);
  }

  /** REMOVES AN EXISTENT REGION CHART FROM A GIVEN USER */
  @Delete('/')
  @ApiOperation({
    summary:
      'Removes a previously purchased region chart, from a given user. (Requires administrator credentials)',
  })
  @ApiResponse({ type: Number, isArray: false })
  removeCritter(
    @Body() purchase: Purchase,
    @GetUser() user: User,
  ): Promise<void> {
    return this.purchasesService.deletePurchase(
      purchase.regionId,
      purchase.userId,
      user,
    );
  }

  /*
  @Get('/region/:regionId')
  @ApiOperation({
    summary: 'Retrieves a list of all available critters for a given region',
  })
  getCrittersInRegion(
    @Param('regionId') regionId: string,
    @GetUser() user: User,
  ): Promise<Critter[]> {
    this.logger.verbose(
      `Retrieving all critters by region. Filters: ${JSON.stringify(regionId)}`,
    );
    return this.critterRegionService.getCrittersInRegion(regionId);
  }
  */
}
