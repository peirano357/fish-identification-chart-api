import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CritterRegion } from '../critters-region/critter-region.entity';
import { CrittersRegionsService } from '../critters-region/critters-regions.service';
import { Critter } from '../critters/critter.entity';

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
  @ApiBearerAuth('token')
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

  @Delete('/:id/region')
  @ApiBearerAuth('token')
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
  @ApiBearerAuth('token')
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
