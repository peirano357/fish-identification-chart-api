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
import { Spot } from 'src/spots/spot.entity';
import { SpotsService } from 'src/spots/spots.service';
import { Critter } from 'src/critters/critter.entity';

@Controller('spots')
@UseGuards(AuthGuard())
@ApiTags('Spots')
export class SpotsController {
  private logger = new Logger('SpotsController');

  constructor(
    private configService: ConfigService,
    private spotsService: SpotsService,
  ) {}

  /** MARKS A CRITTER / FISH AS "SPOTTED" FOR A GIVEN USER*/
  @Post('/')
  @ApiOperation({
    summary: 'Marks a critter / fish as "spotted" for a given user',
  })
  @ApiResponse({
    type: Spot,
    isArray: false,
    status: 201,
    description: 'Critter / fish successfully saved as "spotted" for user.',
  })
  addPurchase(@Body() spot: Spot, @GetUser() user: User): Promise<Spot> {
    return this.spotsService.createSpot(spot, user);
  }

  /** UNMARKS A CRITTER / FISH FROM "SPOTTED" LIST FOR A GIVEN USER */
  @Delete('/')
  @ApiOperation({
    summary:
      'Unmarks a critter / fish from the "Spotted List" for a given user.',
  })
  @ApiResponse({ type: Number, isArray: false })
  removeSpot(@Body() spot: Spot, @GetUser() user: User): Promise<void> {
    return this.spotsService.deleteSpot(spot.critterId, user);
  }

  @Get('/me')
  @ApiOperation({
    summary: 'Retrieves a list of all spotted critters for the current user.',
  })
  getSpotsForUser(@GetUser() user: User): Promise<Critter[]> {
    this.logger.verbose(`Retrieving all critters spotted by the current user.`);
    return this.spotsService.getSpotsByUser(user.id);
  }
}
