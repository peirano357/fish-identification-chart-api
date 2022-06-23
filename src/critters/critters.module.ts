import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CrittersController } from './critters.controller';
import { CrittersRepository } from './critters.repository';
import { CrittersService } from './critters.service';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CrittersRepository]),
    AuthModule,
  ],
  controllers: [CrittersController],
  providers: [CrittersService],
})
export class CrittersModule {}
