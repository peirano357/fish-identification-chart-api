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
import { CritterRegion } from 'src/critters-region/critter-region.entity';
import { CrittersRegionsService } from 'src/critters-region/critters-regions.service';
import { Critter } from 'src/critters/critter.entity';

@Controller('critters')
@UseGuards(AuthGuard())
@ApiTags('Critters')
export class CrittersRegionsController {
  private logger = new Logger('CrittersRegionsController');

  constructor(
    private configService: ConfigService,
    private critterRegionService: CrittersRegionsService,
  ) {}

  /** ADDS A CRITTER TO A GIVEN REGION */
  @Post('/:id/region')
  @ApiOperation({
    summary:
      'Adds a given critter to a given region chart. (Requires administrator credentials)',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Critter Id (uuid) as appears in the database.',
  })
  @ApiResponse({
    type: CritterRegion,
    isArray: false,
    status: 201,
    description: 'Critter successfully added to region',
  })
  addCritter(
    @Param('id') id: string,
    @Body() critterRegion: CritterRegion,
    @GetUser() user: User,
  ): Promise<CritterRegion> {
    critterRegion.critterId = id;
    return this.critterRegionService.createCritterRegion(critterRegion, user);
  }

  /** MODIFIES EXISTENT CRITTER INSIDE A REGION */
  /*
  @Patch("/:id/order-product")
  @ApiOperation({
    summary:
      "Actualiza los atributos de un producto dentro de un pedido enviado por ID de PEDIDO",
  })
  @ApiParam({
    name: "id",
    type: Number,
    required: true,
    description: "El ID de pedido como figura en la base de datos",
  })
  @ApiResponse({
    type: OrderProduct,
    isArray: false,
    status: 200,
    description:
      "El producto fue actualizado con éxito dentro del pedido actual",
  })
  updateProduct(
    @Req() request: any,
    @Param("id") id: number,
    @Body() orderProduct: OrderProduct
  ): Promise<OrderProduct> {
    orderProduct.orderId = id;
    return this.serviceOrderProduct.update(
      {
        productCode: orderProduct.productCode,
        color: orderProduct.color,
        size: orderProduct.size,
        orderId: id,
      },
      orderProduct
    );
  }
  */
  /**********/
  /** REMOVES AN EXISTENT CRITTER FROM A GIVEN REGION */
  @Delete('/:id/region')
  @ApiOperation({
    summary:
      'Removes an existent critter from a given region. (Requires administrator credentials)',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Critter Id (uuid) as appears in the database.',
  })
  @ApiResponse({ type: Number, isArray: false })
  removeCritter(
    @Param('id') id: string,
    @Body() critterRegion: CritterRegion,
    @GetUser() user: User,
  ): Promise<void> {
    return this.critterRegionService.deleteCritterRegion(
      id,
      critterRegion.regionId,
      user,
    );
  }

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
}
