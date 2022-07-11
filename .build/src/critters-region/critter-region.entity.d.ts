import { Critter } from '../critters/critter.entity';
import { Region } from '../regions/region.entity';
export declare class CritterRegion {
    id: string;
    critterId: string;
    regionId: string;
    sort: number;
    critter?: Critter;
    region?: Region;
}
