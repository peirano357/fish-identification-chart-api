import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { GetRegionsFilterDto } from './dto/get-regions-filter.dto';
import { RegionsRepository } from './regions.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/regions/region.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

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
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async deleteRegion(id: string): Promise<void> {
    const result = await this.regionRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateRegion(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
  ): Promise<Region> {
    const region = await this.getRegionById(id);
    region.name = name;
    region.description = description;
    region.imageUrl = imageUrl;
    await this.regionRepository.save(region);
    return region;
  }

  createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionRepository.createRegion(createRegionDto);
  }
}
