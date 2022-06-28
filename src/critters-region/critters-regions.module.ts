import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CrittersModule } from '../critters/critters.module';
import { CrittersRepository } from '../critters/critters.repository';
import { RegionsModule } from '../regions/regions.module';
import { RegionsRepository } from '../regions/regions.repository';
import { CrittersRegionsController } from './critters-regions.controller';
import { CrittersRegionsRepository } from './critters-regions.repository';
import { CrittersRegionsService } from './critters-regions.service';

@Module({
  imports: [
    ConfigModule,
    RegionsModule,
    CrittersModule,
    TypeOrmModule.forFeature([
      CrittersRegionsRepository,
      RegionsRepository,
      CrittersRepository,
    ]),
    AuthModule,
  ],
  controllers: [CrittersRegionsController],
  providers: [CrittersRegionsService],
})
export class CrittersRegionsModule {}
