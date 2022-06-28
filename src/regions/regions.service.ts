import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { GetRegionsFilterDto } from './dto/get-regions-filter.dto';
import { RegionsRepository } from './regions.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from '../regions/region.entity';
import { User } from '../auth/user.entity';
import { UserTypeEnum } from '../auth/enum/user-type.enum';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(RegionsRepository)
    private regionRepository: RegionsRepository,
  ) {}

  getRegions(filterDto: GetRegionsFilterDto): Promise<Region[]> {
    return this.regionRepository.getRegions(filterDto);
  }

  async getRegionById(id: string): Promise<Region> {
    const found = await this.regionRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Region with ID "${id}" not found`);
    }
    return found;
  }

  async deleteRegion(id: string, user: User): Promise<void> {
    if (user.userType == UserTypeEnum.administrator) {
      const result = await this.regionRepository.delete({ id });
      if (result.affected === 0) {
        throw new NotFoundException(`Region with ID "${id}" not found`);
      }
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }

  async updateRegion(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    user: User,
  ): Promise<Region> {
    const region = await this.getRegionById(id);
    region.name = name;
    region.description = description;
    region.imageUrl = imageUrl;

    if (user.userType == UserTypeEnum.administrator) {
      await this.regionRepository.save(region);
      return region;
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }

  createRegion(createRegionDto: CreateRegionDto, user: User): Promise<Region> {
    if (user.userType == UserTypeEnum.administrator) {
      return this.regionRepository.createRegion(createRegionDto);
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }
}
