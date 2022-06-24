import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCritterDto } from './dto/create-critter.dto';
import { GetCritterFilterDto } from './dto/get-critters-filter.dto';

import { Critter } from './critter.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Critter)
export class CrittersRepository extends Repository<Critter> {
  private logger = new Logger('RegionsRepository');
  async createCritter(createCritterDto: CreateCritterDto): Promise<Critter> {
    const { name, description, imageUrl } = createCritterDto;

    const critter = this.create({
      name,
      description,
      imageUrl,
    });

    await this.save(critter);
    return critter;
  }

  async getCritters(filterDto: GetCritterFilterDto): Promise<Critter[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('critter');

    //query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(critter.name) LIKE LOWER(:search) OR LOWER(critter.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const critters = await query.getMany();
      return critters;
    } catch (error) {
      this.logger.error(
        `Failed to get critters. Filters: ${JSON.stringify(filterDto)} `,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getCrittersByIds(ids: string[]): Promise<Critter[]> {
    const query = this.createQueryBuilder('critter');

    //query.where({ user });

    if (ids) {
      query.andWhere('id IN (:ids)', { ids: `${ids}` });
    }

    try {
      const critters = await query.getMany();
      return critters;
    } catch (error) {
      this.logger.error(
        `Failed to get critters. Filters: ${JSON.stringify(ids)} `,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
