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
import { CreateRegionDto } from './dto/create-region.dto';
import { GetRegionsFilterDto } from './dto/get-regions-filter.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
//import { TaskStatus } from './task-status.enum';
import { Region } from './region.entity';
import { RegionsService } from './regions.service';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { string } from '@hapi/joi';

@Controller('regions')
@UseGuards(AuthGuard())
@ApiTags('Regions')
export class RegionsController {
  private logger = new Logger('RegionsController');

  constructor(
    private regionService: RegionsService,
    private configService: ConfigService,
  ) {}

  @Post()
  createRegion(
    @Body() createRegionDto: CreateRegionDto,
    //@GetUser() user: User,
  ): Promise<Region> {
    return this.regionService.createRegion(createRegionDto);
  }

  @Delete('/:id')
  deleteRegion(@Param('id') id: string): Promise<void> {
    return this.regionService.deleteRegion(id);
  }

  @Patch('/:id')
  updateRegion(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    const { name, description, imageUrl } = updateRegionDto;
    return this.regionService.updateRegion(id, name, description, imageUrl);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieves a list of all available diving regions',
  })
  /*
  @ApiQuery({
    name: 'search',
    type: string,
    required: false,
    description: 'Search string key',
  })
  */
  getRegions(@Query() filterDto: GetRegionsFilterDto): Promise<Region[]> {
    this.logger.verbose(
      `Retrieving all regions. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.regionService.getRegions(filterDto);
  }

  @Get('/:id')
  getRegionById(@Param('id') id: string): Promise<Region> {
    return this.regionService.getRegionById(id);
  }
}
