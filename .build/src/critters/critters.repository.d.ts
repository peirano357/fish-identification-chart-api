import { Repository } from 'typeorm';
import { CreateCritterDto } from './dto/create-critter.dto';
import { GetCritterFilterDto } from './dto/get-critters-filter.dto';
import { Critter } from './critter.entity';
export declare class CrittersRepository extends Repository<Critter> {
    private logger;
    createCritter(createCritterDto: CreateCritterDto): Promise<Critter>;
    getCritters(filterDto: GetCritterFilterDto): Promise<Critter[]>;
}
