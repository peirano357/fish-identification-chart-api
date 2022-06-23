import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCritterDto } from './dto/create-critter.dto';
import { GetCritterFilterDto } from './dto/get-critters-filter.dto';
import { CrittersRepository } from './critters.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Critter } from 'src/critters/critter.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserTypeEnum } from 'src/auth/enum/user-type.enum';

@Injectable()
export class CrittersService {
  constructor(
    @InjectRepository(CrittersRepository)
    private critterRepository: CrittersRepository,
  ) {}

  getCritters(filterDto: GetCritterFilterDto): Promise<Critter[]> {
    return this.critterRepository.getCritters(filterDto);
  }

  async getCritterById(id: string): Promise<Critter> {
    const found = await this.critterRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Critter with ID "${id}" not found`);
    }
    return found;
  }

  async deleteCritter(id: string, user: User): Promise<void> {
    if (user.userType == UserTypeEnum.administrator) {
      const result = await this.critterRepository.delete({ id });
      if (result.affected === 0) {
        throw new NotFoundException(`Critter with ID "${id}" not found`);
      }
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }

  async updateCritter(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    user: User,
  ): Promise<Critter> {
    const critter = await this.getCritterById(id);
    critter.name = name;
    critter.description = description;
    critter.imageUrl = imageUrl;

    if (user.userType == UserTypeEnum.administrator) {
      await this.critterRepository.save(critter);
      return critter;
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }

  createCritter(
    createCritterDto: CreateCritterDto,
    user: User,
  ): Promise<Critter> {
    if (user.userType == UserTypeEnum.administrator) {
      return this.critterRepository.createCritter(createCritterDto);
    } else {
      throw new UnauthorizedException(
        'Only administrators can perform this task.',
      );
    }
  }
}
