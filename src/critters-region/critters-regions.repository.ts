import { EntityRepository, Repository } from 'typeorm';
import { CreateCritterRegionDto } from './dto/create-critter-region.dto';
import { CritterRegion } from './critter-region.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(CritterRegion)
export class CrittersRegionsRepository extends Repository<CritterRegion> {
  private logger = new Logger('CrittersRegionsRepository');
  async createCritterRegion(
    createCritterRegionDto: CreateCritterRegionDto,
  ): Promise<CritterRegion> {
    const { critterId, regionId, sort } = createCritterRegionDto;
    const critterregion = this.create({
      critterId: critterId,
      regionId: regionId,
      sort: sort,
    });

    await this.save(critterregion);
    return critterregion;
  }

  async getCrittersInRegion(regionId: string): Promise<CritterRegion[]> {
    const query = this.createQueryBuilder('critter-region');

    if (regionId) {
      /*
      query.andWhere('regionId LIKE (:regionId)', {
        regionId: `%${regionId}%`,
      });
      */
      query.where({ regionId: regionId });
    }

    try {
      const crittersRegion = await query.getMany();

      return crittersRegion;
    } catch (error) {
      this.logger.error(
        `Failed to get critters by region. Filters: ${JSON.stringify(
          regionId,
        )} `,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
