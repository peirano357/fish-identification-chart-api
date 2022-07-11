import { Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { GetRegionsFilterDto } from './dto/get-regions-filter.dto';
import { Region } from './region.entity';
export declare class RegionsRepository extends Repository<Region> {
    private logger;
    createRegion(createRegionDto: CreateRegionDto): Promise<Region>;
    getRegions(filterDto: GetRegionsFilterDto): Promise<Region[]>;
}
