import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchasesRepository } from './purchases.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/purchases/purchase.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserTypeEnum } from 'src/auth/enum/user-type.enum';
import { UsersRepository } from 'src/auth/users.repository';
import { RegionsRepository } from 'src/regions/regions.repository';
import { Region } from 'src/regions/region.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(RegionsRepository)
    private regionsRepository: RegionsRepository,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @InjectRepository(PurchasesRepository)
    private purchasesRepository: PurchasesRepository,
  ) {}

  async getPurchasesByUser(userId: string): Promise<Region[]> {
    const purchases = await this.purchasesRepository.getPurchasesByUser(userId);

    const ids = [];
    await Promise.all(
      purchases.map(async (p) => {
        ids.push(p.regionId);
      }),
    );
    return await this.regionsRepository.getRegionsByIds(ids);
  }

  async getPurchaseByIds(userId: string, regionId: string): Promise<Purchase> {
    const found = await this.purchasesRepository.findOne({
      where: { userId, regionId },
    });
    if (!found) {
      throw new NotFoundException(`Element with ID "${userId}" not found`);
    }
    return found;
  }

  async deletePurchase(
    regionId: string,
    userId: string,
    user: User,
  ): Promise<void> {
    if (user.userType == UserTypeEnum.administrator) {
      const result = await this.purchasesRepository.delete({
        userId: userId,
        regionId: regionId,
      });
      if (result.affected === 0) {
        throw new NotFoundException(
          `Critter with ID "${userId}" not found for region with ID "${regionId}" `,
        );
      }
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }

  async updatePurchase(
    id: string,
    userId: string,
    regionId: string,
    purchasedDate: Date,
    user: User,
  ): Promise<Purchase> {
    const purchase = await this.getPurchaseByIds(userId, regionId);
    purchase.purchasedDate = purchasedDate;

    if (user.userType == UserTypeEnum.administrator) {
      // check if exists
      const exists = this.purchasesRepository.findOne({
        where: {
          userId: userId,
          regionId: regionId,
        },
      });

      if (!exists) {
        throw new NotFoundException(
          `Element with IDs "${userId}" and "${regionId}" not found`,
        );
      }

      await this.purchasesRepository.save(purchase);
      return purchase;
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
    user: User,
  ): Promise<Purchase> {
    if (user.userType == UserTypeEnum.administrator) {
      // validate region
      const regionExists = await this.regionsRepository.findOne({
        where: { id: createPurchaseDto.regionId },
      });

      if (!regionExists) {
        throw new NotFoundException(
          `Region with ID "${createPurchaseDto.regionId}" not found`,
        );
      }

      // validate user
      const userExists = await this.usersRepository.findOne({
        where: { id: createPurchaseDto.userId },
      });

      if (!userExists) {
        throw new NotFoundException(
          `User with ID "${createPurchaseDto.userId}" not found`,
        );
      }

      return this.purchasesRepository.createPurchase(createPurchaseDto);
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }
}
