import { User } from '../auth/user.entity';
import { Critter } from '../critters/critter.entity';
export declare class Spot {
    id: string;
    userId: string;
    critterId: string;
    latitude: number;
    longitude: number;
    spottedDate: Date;
    user?: User;
    critter?: Critter;
}
