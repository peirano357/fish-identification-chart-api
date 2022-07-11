import { User } from '../auth/user.entity';
import { ConfigService } from '@nestjs/config';
import { Spot } from '../spots/spot.entity';
import { SpotsService } from '../spots/spots.service';
import { Critter } from '../critters/critter.entity';
export declare class SpotsController {
    private configService;
    private spotsService;
    private logger;
    constructor(configService: ConfigService, spotsService: SpotsService);
    addSpot(spot: Spot, user: User): Promise<Spot>;
    removeSpot(spot: Spot, user: User): Promise<void>;
    getSpotsForUser(user: User): Promise<Critter[]>;
}
