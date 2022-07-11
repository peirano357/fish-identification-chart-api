import { Repository } from 'typeorm';
import { CreateSpotDto } from './dto/create-spot.dto';
import { Spot } from './spot.entity';
export declare class SpotsRepository extends Repository<Spot> {
    private logger;
    createSpot(createSpotDto: CreateSpotDto): Promise<Spot>;
    getSpotsByUser(userId: string): Promise<Spot[]>;
}
