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
import { CreateCritterDto } from './dto/create-critter.dto';
import { GetCritterFilterDto } from './dto/get-critters-filter.dto';
import { UpdateCritterDto } from './dto/update-critter.dto';
//import { TaskStatus } from './task-status.enum';
import { Critter } from './critter.entity';
import { CrittersService } from './critters.service';
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

@Controller('critters')
@UseGuards(AuthGuard())
@ApiTags('Critters')
export class CrittersController {
  private logger = new Logger('CrittersController');

  constructor(
    private critterService: CrittersService,
    private configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({
    summary:
      'Creates a new critter / fish in the database. (Requires administrator credentials)',
  })
  createCritter(
    @Body() createCritterDto: CreateCritterDto,
    @GetUser() user: User,
  ): Promise<Critter> {
    return this.critterService.createCritter(createCritterDto, user);
  }

  @Delete('/:id')
  @ApiOperation({
    summary:
      'Deletes a critter / fish from the database. (Requires administrator credentials)',
  })
  deleteCritter(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.critterService.deleteCritter(id, user);
  }

  @Patch('/:id')
  @ApiOperation({
    summary:
      'Updates an existent critter / fish. (Requires administrator credentials)',
  })
  updateCritter(
    @Param('id') id: string,
    @Body() updateCritterDto: UpdateCritterDto,
    @GetUser() user: User,
  ): Promise<Critter> {
    const { name, description, imageUrl } = updateCritterDto;
    return this.critterService.updateCritter(
      id,
      name,
      description,
      imageUrl,
      user,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieves a list of all available critters',
  })
  /*
  @ApiQuery({
    name: 'search',
    type: string,
    required: false,
    description: 'Search string key',
  })
  */
  getCritters(
    @Query() filterDto: GetCritterFilterDto,
    @GetUser() user: User,
  ): Promise<Critter[]> {
    this.logger.verbose(
      `Retrieving all critters. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.critterService.getCritters(filterDto);
  }

  @Get('/:id')
  @ApiOperation({
    summary:
      'Retrieves an existent critter / fish from the database by its ID.',
  })
  getCritterById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Critter> {
    return this.critterService.getCritterById(id);
  }
}
