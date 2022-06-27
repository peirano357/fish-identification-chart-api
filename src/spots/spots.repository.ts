import { EntityRepository, Repository } from 'typeorm';
import { CreateSpotDto } from './dto/create-spot.dto';

import { Spot } from './spot.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Spot)
export class SpotsRepository extends Repository<Spot> {
  private logger = new Logger('SpotsRepository');
  async createSpot(createSpotDto: CreateSpotDto): Promise<Spot> {
    const { userId, critterId, spottedDate } = createSpotDto;
    const spot = this.create({
      userId: userId,
      critterId: critterId,
      spottedDate: spottedDate,
    });

    await this.save(spot);
    return spot;
  }

  async getSpotsByUser(userId: string): Promise<Spot[]> {
    const query = this.createQueryBuilder('spot');

    if (userId) {
      query.where({ userId: userId });
    }

    try {
      const spots = await query.getMany();

      return spots;
    } catch (error) {
      this.logger.error(
        `Failed to get spots for user. Filters: ${JSON.stringify(userId)} `,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
