import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCritterRegionDto } from './dto/create-critter-region.dto';
import { GetCrittersRegionsFilterDto } from './dto/get-critters-regions-filter.dto';
import { CrittersRegionsRepository } from './critters-regions.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CritterRegion } from 'src/critters-region/critter-region.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserTypeEnum } from 'src/auth/enum/user-type.enum';
import { CrittersService } from 'src/critters/critters.service';
import { CrittersRepository } from 'src/critters/critters.repository';
import { RegionsService } from 'src/regions/regions.service';
import { RegionsRepository } from 'src/regions/regions.repository';

@Injectable()
export class CrittersRegionsService {
  constructor(
    @InjectRepository(RegionsRepository)
    private regionsRepository: RegionsRepository,

    @InjectRepository(CrittersRepository)
    private crittersRepository: CrittersRepository,

    @InjectRepository(CrittersRegionsRepository)
    private crittersRegionRepository: CrittersRegionsRepository,
  ) {}

  getCrittersInRegion(
    filterDto: GetCrittersRegionsFilterDto,
  ): Promise<CritterRegion[]> {
    return this.crittersRegionRepository.getCrittersInRegion(filterDto);
  }

  async getCritterRegionByIds(
    critterId: string,
    regionId: string,
  ): Promise<CritterRegion> {
    const found = await this.crittersRegionRepository.findOne({
      where: { critterId, regionId },
    });
    if (!found) {
      throw new NotFoundException(`Element with ID "${critterId}" not found`);
    }
    return found;
  }

  async deleteCritterRegion(
    critterId: string,
    regionId: string,
    user: User,
  ): Promise<void> {
    if (user.userType == UserTypeEnum.administrator) {
      const result = await this.crittersRegionRepository.delete({
        critterId,
        regionId,
      });
      if (result.affected === 0) {
        throw new NotFoundException(`Element with ID "${critterId}" not found`);
      }
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }

  async updateCritterRegion(
    id: string,
    critterId: string,
    regionId: string,
    sort: number,
    user: User,
  ): Promise<CritterRegion> {
    const critterRegion = await this.getCritterRegionByIds(critterId, regionId);
    critterRegion.sort = sort;

    if (user.userType == UserTypeEnum.administrator) {
      // check if exists
      const exists = this.crittersRegionRepository.findOne({
        where: {
          critterId: critterId,
          regionId: regionId,
        },
      });

      if (!exists) {
        throw new NotFoundException(
          `Element with IDs "${critterId}" and "${regionId}" not found`,
        );
      }

      await this.crittersRegionRepository.save(critterRegion);
      return critterRegion;
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }

  async createCritterRegion(
    createCritterRegionDto: CreateCritterRegionDto,
    user: User,
  ): Promise<CritterRegion> {
    if (user.userType == UserTypeEnum.administrator) {
      // validate region
      const regionExists = await this.regionsRepository.findOne({
        where: { id: createCritterRegionDto.regionId },
      });

      if (!regionExists) {
        throw new NotFoundException(
          `Region with ID "${createCritterRegionDto.regionId}" not found`,
        );
      }

      // validate critter
      const critterExists = await this.crittersRepository.findOne({
        where: { id: createCritterRegionDto.critterId },
      });

      if (!critterExists) {
        throw new NotFoundException(
          `Critter with ID "${createCritterRegionDto.critterId}" not found`,
        );
      }

      return this.crittersRegionRepository.createCritterRegion(
        createCritterRegionDto,
      );
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }
}
