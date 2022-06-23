import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateCritterRegionDto } from './dto/create-critter-region.dto';
import { GetCrittersRegionsFilterDto } from './dto/get-critters-regions-filter.dto';
import { UpdateCritterRegionDto } from './dto/update-critter-region.dto';
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
import { CrittersService } from 'src/critters/critters.service';

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
    summary: 'Adds a given critter to a given region.',
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
}
