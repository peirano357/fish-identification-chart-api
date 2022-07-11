import { CreateSpotDto } from './dto/create-spot.dto';
import { SpotsRepository } from './spots.repository';
import { User } from '../auth/user.entity';
import { UsersRepository } from '../auth/users.repository';
import { CrittersRepository } from '../critters/critters.repository';
import { Critter } from '../critters/critter.entity';
import { Spot } from './spot.entity';
import { PurchasesRepository } from '../purchases/purchases.repository';
import { CrittersRegionsRepository } from '../critters-region/critters-regions.repository';
export declare class SpotsService {
    private crittersRegionsRepository;
    private crittersRepository;
    private usersRepository;
    private spotsRepository;
    private purchasesRepository;
    constructor(crittersRegionsRepository: CrittersRegionsRepository, crittersRepository: CrittersRepository, usersRepository: UsersRepository, spotsRepository: SpotsRepository, purchasesRepository: PurchasesRepository);
    getSpotsByUser(userId: string): Promise<Critter[]>;
    getSpotByIds(userId: string, critterId: string): Promise<Spot>;
    deleteSpot(critterId: string, user: User): Promise<void>;
    updateSpot(id: string, critterId: string, spottedDate: Date, latitude: number, longitude: number, user: User): Promise<Spot>;
    createSpot(createSpotDto: CreateSpotDto, user: User): Promise<Spot>;
}
