import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RegionsController } from './regions.controller';
import { RegionsRepository } from './regions.repository';
import { RegionsService } from './regions.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([RegionsRepository]),
    AuthModule,
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
