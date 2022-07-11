import { CreateCritterDto } from './dto/create-critter.dto';
import { GetCritterFilterDto } from './dto/get-critters-filter.dto';
import { CrittersRepository } from './critters.repository';
import { Critter } from '../critters/critter.entity';
import { User } from '../auth/user.entity';
export declare class CrittersService {
    private critterRepository;
    constructor(critterRepository: CrittersRepository);
    getCritters(filterDto: GetCritterFilterDto): Promise<Critter[]>;
    getCritterById(id: string): Promise<Critter>;
    deleteCritter(id: string, user: User): Promise<void>;
    updateCritter(id: string, name: string, description: string, imageUrl: string, user: User): Promise<Critter>;
    createCritter(createCritterDto: CreateCritterDto, user: User): Promise<Critter>;
}
