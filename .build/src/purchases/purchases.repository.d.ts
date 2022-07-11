import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './purchase.entity';
export declare class PurchasesRepository extends Repository<Purchase> {
    private logger;
    createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<Purchase>;
    getPurchasesByUser(userId: string): Promise<Purchase[]>;
}
