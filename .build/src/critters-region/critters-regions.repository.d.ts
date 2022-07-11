import { Repository } from 'typeorm';
import { CreateCritterRegionDto } from './dto/create-critter-region.dto';
import { CritterRegion } from './critter-region.entity';
export declare class CrittersRegionsRepository extends Repository<CritterRegion> {
    private logger;
    createCritterRegion(createCritterRegionDto: CreateCritterRegionDto): Promise<CritterRegion>;
    getCrittersInRegion(regionId: string): Promise<CritterRegion[]>;
}
