import { User } from '../auth/user.entity';
import { ConfigService } from '@nestjs/config';
import { CritterRegion } from '../critters-region/critter-region.entity';
import { CrittersRegionsService } from '../critters-region/critters-regions.service';
import { Critter } from '../critters/critter.entity';
export declare class CrittersRegionsController {
    private configService;
    private critterRegionService;
    private logger;
    constructor(configService: ConfigService, critterRegionService: CrittersRegionsService);
    addCritter(id: string, critterRegion: CritterRegion, user: User): Promise<CritterRegion>;
    removeCritter(id: string, critterRegion: CritterRegion, user: User): Promise<void>;
    getCrittersInRegion(regionId: string, user: User): Promise<Critter[]>;
}
