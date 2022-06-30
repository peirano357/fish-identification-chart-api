import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RegionsModule } from '../regions/regions.module';
import { UsersRepository } from '../auth/users.repository';
import { SpotsController } from './spots.controller';
import { SpotsRepository } from './spots.repository';
import { SpotsService } from './spots.service';
import { CrittersRepository } from '../critters/critters.repository';
import { CrittersRegionsRepository } from '../critters-region/critters-regions.repository';
import { PurchasesRepository } from '../purchases/purchases.repository';

@Module({
  imports: [
    ConfigModule,
    RegionsModule,
    TypeOrmModule.forFeature([
      SpotsRepository,
      CrittersRegionsRepository,
      PurchasesRepository,
      CrittersRepository,
      UsersRepository,
    ]),
    AuthModule,
  ],
  controllers: [SpotsController],
  providers: [SpotsService],
})
export class SpotsModule {}
