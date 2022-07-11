import { User } from '../auth/user.entity';
import { ConfigService } from '@nestjs/config';
import { Purchase } from '../purchases/purchase.entity';
import { PurchasesService } from '../purchases/purchases.service';
import { Region } from '../regions/region.entity';
export declare class PurchasesController {
    private configService;
    private purchasesService;
    private logger;
    constructor(configService: ConfigService, purchasesService: PurchasesService);
    addPurchase(purchase: Purchase, user: User): Promise<Purchase>;
    removeCritter(purchase: Purchase, user: User): Promise<void>;
    getPurchasesForUser(user: User): Promise<Region[]>;
}
