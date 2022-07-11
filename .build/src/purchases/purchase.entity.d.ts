import { User } from '../auth/user.entity';
import { Region } from '../regions/region.entity';
export declare class Purchase {
    id: string;
    userId: string;
    regionId: string;
    purchasedDate: Date;
    user?: User;
    region?: Region;
}
