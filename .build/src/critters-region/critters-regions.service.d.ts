import { CreateCritterRegionDto } from './dto/create-critter-region.dto';
import { CrittersRegionsRepository } from './critters-regions.repository';
import { CritterRegion } from '../critters-region/critter-region.entity';
import { User } from '../auth/user.entity';
import { CrittersRepository } from '../critters/critters.repository';
import { RegionsRepository } from '../regions/regions.repository';
import { Critter } from '../critters/critter.entity';
export declare class CrittersRegionsService {
    private regionsRepository;
    private crittersRepository;
    private crittersRegionRepository;
    constructor(regionsRepository: RegionsRepository, crittersRepository: CrittersRepository, crittersRegionRepository: CrittersRegionsRepository);
    getCrittersInRegion(regionId: string): Promise<Critter[]>;
    isCritterInRegions(critterId: string, regionId: string[]): Promise<boolean>;
    getCritterRegionByIds(critterId: string, regionId: string): Promise<CritterRegion>;
    deleteCritterRegion(critterId: string, regionId: string, user: User): Promise<void>;
    updateCritterRegion(id: string, critterId: string, regionId: string, sort: number, user: User): Promise<CritterRegion>;
    createCritterRegion(createCritterRegionDto: CreateCritterRegionDto, user: User): Promise<CritterRegion>;
}
