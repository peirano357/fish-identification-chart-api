import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RegionsModule } from 'src/regions/regions.module';
import { RegionsRepository } from 'src/regions/regions.repository';
import { UsersRepository } from 'src/auth/users.repository';
import { SpotsController } from './spots.controller';
import { SpotsRepository } from './spots.repository';
import { SpotsService } from './spots.service';
import { CrittersRepository } from 'src/critters/critters.repository';

@Module({
  imports: [
    ConfigModule,
    RegionsModule,
    TypeOrmModule.forFeature([
      SpotsRepository,
      RegionsRepository,
      CrittersRepository,
      UsersRepository,
    ]),
    AuthModule,
  ],
  controllers: [SpotsController],
  providers: [SpotsService],
})
export class SpotsModule {}
