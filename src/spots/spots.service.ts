import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { SpotsRepository } from './spots.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/purchases/purchase.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserTypeEnum } from 'src/auth/enum/user-type.enum';
import { UsersRepository } from 'src/auth/users.repository';
import { RegionsRepository } from 'src/regions/regions.repository';
import { Region } from 'src/regions/region.entity';

import { CrittersRepository } from 'src/critters/critters.repository';
import { Critter } from 'src/critters/critter.entity';
import { Spot } from './spot.entity';
import { In } from 'typeorm';

@Injectable()
export class SpotsService {
  constructor(
    @InjectRepository(RegionsRepository)
    private regionsRepository: RegionsRepository,

    @InjectRepository(CrittersRepository)
    private crittersRepository: CrittersRepository,

    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    @InjectRepository(SpotsRepository)
    private spotsRepository: SpotsRepository,
  ) {}

  async getSpotsByUser(userId: string): Promise<Critter[]> {
    const spots = await this.spotsRepository.getSpotsByUser(userId);

    const ids = [];
    await Promise.all(
      spots.map(async (p) => {
        ids.push(p.critterId);
      }),
    );
    return await this.crittersRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getSpotByIds(userId: string, critterId: string): Promise<Spot> {
    const found = await this.spotsRepository.findOne({
      where: { userId, critterId },
    });
    if (!found) {
      throw new NotFoundException(
        `Element with ID "${userId}, ${critterId} not found`,
      );
    }
    return found;
  }

  async deleteSpot(critterId: string, user: User): Promise<void> {
    const result = await this.spotsRepository.delete({
      userId: user.id,
      critterId: critterId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Critter with ID "${critterId}" not found for current user. `,
      );
    }
  }

  async updateSpot(
    id: string,
    critterId: string,
    spottedDate: Date,
    latitude: number,
    longitude: number,
    user: User,
  ): Promise<Spot> {
    const spot = await this.getSpotByIds(user.id, critterId);
    spot.spottedDate = spottedDate;
    spot.longitude = longitude;
    spot.latitude = latitude;

    // check if exists
    const exists = this.spotsRepository.findOne({
      where: {
        userId: user.id,
        critterId: critterId,
      },
    });

    if (!exists) {
      throw new NotFoundException(
        `Element with IDs "${user.id}" and "${critterId}" not found`,
      );
    }

    await this.spotsRepository.save(spot);
    return spot;
  }

  async createSpot(createSpotDto: CreateSpotDto, user: User): Promise<Spot> {
    // validate critter
    const critterExists = await this.crittersRepository.findOne({
      where: { id: createSpotDto.critterId },
    });

    if (!critterExists) {
      throw new NotFoundException(
        `Critter with ID "${createSpotDto.critterId}" not found`,
      );
    }

    // validate user
    const userExists = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    if (!userExists) {
      throw new NotFoundException(`User with ID "${user.id}" not found`);
    }

    createSpotDto.userId = user.id;

    return this.spotsRepository.createSpot(createSpotDto);
  }
}
