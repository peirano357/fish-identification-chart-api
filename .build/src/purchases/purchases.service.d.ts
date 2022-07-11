import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchasesRepository } from './purchases.repository';
import { Purchase } from '../purchases/purchase.entity';
import { User } from '../auth/user.entity';
import { UsersRepository } from '../auth/users.repository';
import { RegionsRepository } from '../regions/regions.repository';
import { Region } from '../regions/region.entity';
export declare class PurchasesService {
    private regionsRepository;
    private usersRepository;
    private purchasesRepository;
    constructor(regionsRepository: RegionsRepository, usersRepository: UsersRepository, purchasesRepository: PurchasesRepository);
    getPurchasesByUser(userId: string): Promise<Region[]>;
    getPurchaseByIds(userId: string, regionId: string): Promise<Purchase>;
    deletePurchase(regionId: string, userId: string, user: User): Promise<void>;
    updatePurchase(id: string, userId: string, regionId: string, purchasedDate: Date, user: User): Promise<Purchase>;
    createPurchase(createPurchaseDto: CreatePurchaseDto, user: User): Promise<Purchase>;
}
