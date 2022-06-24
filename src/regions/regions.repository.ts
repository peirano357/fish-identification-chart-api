import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { GetRegionsFilterDto } from './dto/get-regions-filter.dto';

import { Region } from './region.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Region)
export class RegionsRepository extends Repository<Region> {
  private logger = new Logger('RegionsRepository');
  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const { name, description, imageUrl } = createRegionDto;

    const region = this.create({
      name,
      description,
      imageUrl,
    });

    await this.save(region);
    return region;
  }

  async getRegions(filterDto: GetRegionsFilterDto): Promise<Region[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('region');

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

  async getRegionsByIds(ids: string[]): Promise<Region[]> {
    const query = this.createQueryBuilder('region');

    if (ids) {
      query.andWhere('id IN (:ids)', { ids: `${ids}` });
    }

    try {
      const regions = await query.getMany();
      return regions;
    } catch (error) {
      this.logger.error(
        `Failed to get regions. Filters: ${JSON.stringify(ids)} `,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
