import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CrittersModule } from 'src/critters/critters.module';
import { CrittersRepository } from 'src/critters/critters.repository';
import { RegionsController } from 'src/regions/regions.controller';
import { RegionsModule } from 'src/regions/regions.module';
import { RegionsRepository } from 'src/regions/regions.repository';
import { RegionsService } from 'src/regions/regions.service';
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
