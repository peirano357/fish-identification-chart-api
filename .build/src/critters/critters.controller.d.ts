import { User } from '../auth/user.entity';
import { CreateCritterDto } from './dto/create-critter.dto';
import { GetCritterFilterDto } from './dto/get-critters-filter.dto';
import { UpdateCritterDto } from './dto/update-critter.dto';
import { Critter } from './critter.entity';
import { CrittersService } from './critters.service';
import { ConfigService } from '@nestjs/config';
export declare class CrittersController {
    private critterService;
    private configService;
    private logger;
    constructor(critterService: CrittersService, configService: ConfigService);
    createCritter(createCritterDto: CreateCritterDto, user: User): Promise<Critter>;
    deleteCritter(id: string, user: User): Promise<void>;
    updateCritter(id: string, updateCritterDto: UpdateCritterDto, user: User): Promise<Critter>;
    getCritters(filterDto: GetCritterFilterDto, user: User): Promise<Critter[]>;
    getCritterById(id: string, user: User): Promise<Critter>;
}
