import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RegionsModule } from '../regions/regions.module';
import { RegionsRepository } from '../regions/regions.repository';
import { UsersRepository } from '../auth/users.repository';
import { PurchasesController } from './purchases.controller';
import { PurchasesRepository } from './purchases.repository';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [
    ConfigModule,
    RegionsModule,
    TypeOrmModule.forFeature([
      PurchasesRepository,
      RegionsRepository,
      UsersRepository,
    ]),
    AuthModule,
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
