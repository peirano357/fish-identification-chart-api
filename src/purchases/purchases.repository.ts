import { EntityRepository, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './purchase.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Purchase)
export class PurchasesRepository extends Repository<Purchase> {
  private logger = new Logger('PurchasesRepository');
  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    const { userId, regionId, purchasedDate } = createPurchaseDto;
    const purchase = this.create({
      userId: userId,
      regionId: regionId,
      purchasedDate: purchasedDate,
    });

    await this.save(purchase);
    return purchase;
  }

  async getPurchasesByUser(userId: string): Promise<Purchase[]> {
    const query = this.createQueryBuilder('purchase');

    if (userId) {
      query.where({ userId: userId });
    }

    try {
      const purchases = await query.getMany();

      return purchases;
    } catch (error) {
      this.logger.error(
        `Failed to get critters by region. Filters: ${JSON.stringify(userId)} `,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
