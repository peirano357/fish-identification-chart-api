import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCritterRegionDto } from './dto/create-critter-region.dto';
import { GetCrittersRegionsFilterDto } from './dto/get-critters-regions-filter.dto';

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

  async getCrittersInRegion(
    filterDto: GetCrittersRegionsFilterDto,
  ): Promise<CritterRegion[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('critter-region');

    //query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(region.name) LIKE LOWER(:search) OR LOWER(region.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const regions = await query.getMany();
      return regions;
    } catch (error) {
      this.logger.error(
        `Failed to get regions. Filters: ${JSON.stringify(filterDto)} `,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
