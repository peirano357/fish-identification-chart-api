import { CreateRegionDto } from './dto/create-region.dto';
import { GetRegionsFilterDto } from './dto/get-regions-filter.dto';
import { RegionsRepository } from './regions.repository';
import { Region } from '../regions/region.entity';
import { User } from '../auth/user.entity';
export declare class RegionsService {
    private regionRepository;
    constructor(regionRepository: RegionsRepository);
    getRegions(filterDto: GetRegionsFilterDto): Promise<Region[]>;
    getRegionById(id: string): Promise<Region>;
    deleteRegion(id: string, user: User): Promise<void>;
    updateRegion(id: string, name: string, description: string, imageUrl: string, user: User): Promise<Region>;
    createRegion(createRegionDto: CreateRegionDto, user: User): Promise<Region>;
}
