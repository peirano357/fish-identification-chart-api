import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserTypeEnum } from '../auth/enum/user-type.enum';
import { CrittersRepository } from './critters.repository';
import { CrittersService } from './critters.service';
import { CreateCritterDto } from './dto/create-critter.dto';

const mockCrittersRepository = () => ({
  getCritters: jest.fn(),
  findOne: jest.fn(),
  createCritter: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

const mockCustomerUser = {
  username: 'Peirano357Diver',
  id: 'dummyId',
  password: 'superEncryptedPassword',
  userType: UserTypeEnum.customer,
};

const mockAdminUser = {
  username: 'Peirano357Admin',
  id: 'dummyId',
  password: 'superEncryptedPassword',
  userType: UserTypeEnum.administrator,
};

describe('CrittersService', () => {
  let crittersService: CrittersService;
  let crittersRepository;

  // create a dummy module that has my repository and service
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CrittersService,
        { provide: CrittersRepository, useFactory: mockCrittersRepository },
      ],
    }).compile();

    crittersService = module.get(CrittersService);
    crittersRepository = module.get(CrittersRepository);
  });

  describe('getCritters', () => {
    it('Calls CrittersRepository.getCritters and returns result', async () => {
      // unncessary test (just added to document different validation tools)
      expect(crittersRepository.getCritters).not.toHaveBeenCalled();

      crittersRepository.getCritters.mockResolvedValue('somevalue');

      const result = await crittersService.getCritters(null);
      // unncessary test (just added to document different validation tools)
      expect(crittersRepository.getCritters).toHaveBeenCalled();

      expect(result).toEqual('somevalue');
    });
  });

  describe('getCritterById', () => {
    it('Calls CrittersRepository.findOne and returns the result', async () => {
      const mockCritter: CreateCritterDto = {
        name: 'Green Sea Turtle',
        description:
          'C. mydas has a dorsoventrally flattened body, a beaked head at the end of a short neck, and paddle-like arms well-adapted for swimming.[23] Adult green turtles grow to 1.5 metres (5 ft) long.[24] The average weight of mature individuals is 68–190 kg (150–419 lb) and the average carapace length is 78–112 cm (31–44 in).[25] Exceptional specimens can weigh 315 kg (694 lb) or even more, with the largest known C. mydas having weighed 395 kg (871 lb) and measured 153 cm (60 in) in carapace length.',
        imageUrl:
          'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20green%20turtle.jpg',
      };

      crittersRepository.findOne.mockResolvedValue(mockCritter);
      const result = await crittersService.getCritterById('someId');
      expect(result).toEqual(mockCritter);
    });
  });

  describe('getCritterById', () => {
    it('Calls CrittersRepository.findOne and handles the error', async () => {
      crittersRepository.findOne.mockResolvedValue(null);
      expect(crittersService.getCritterById('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createCritter', () => {
    it('Calls CrittersRepository.createCritter and returns the result', async () => {
      const mockCritter: CreateCritterDto = {
        name: 'Green Sea Turtle',
        description:
          'C. mydas has a dorsoventrally flattened body, a beaked head at the end of a short neck, and paddle-like arms well-adapted for swimming.[23] Adult green turtles grow to 1.5 metres (5 ft) long.[24] The average weight of mature individuals is 68–190 kg (150–419 lb) and the average carapace length is 78–112 cm (31–44 in).[25] Exceptional specimens can weigh 315 kg (694 lb) or even more, with the largest known C. mydas having weighed 395 kg (871 lb) and measured 153 cm (60 in) in carapace length.',
        imageUrl:
          'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20green%20turtle.jpg',
      };

      crittersRepository.createCritter.mockResolvedValue(mockCritter);
      const result = await crittersService.createCritter(
        mockCritter,
        mockAdminUser,
      );
      expect(result).toEqual(mockCritter);
    });
  });

  describe('createCritter', () => {
    it('Calls CrittersRepository.createCritter and handles the error', async () => {
      const mockCritter: CreateCritterDto = {
        name: 'Green Sea Turtle',
        description:
          'C. mydas has a dorsoventrally flattened body, a beaked head at the end of a short neck, and paddle-like arms well-adapted for swimming.[23] Adult green turtles grow to 1.5 metres (5 ft) long.[24] The average weight of mature individuals is 68–190 kg (150–419 lb) and the average carapace length is 78–112 cm (31–44 in).[25] Exceptional specimens can weigh 315 kg (694 lb) or even more, with the largest known C. mydas having weighed 395 kg (871 lb) and measured 153 cm (60 in) in carapace length.',
        imageUrl:
          'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20green%20turtle.jpg',
      };
      crittersRepository.createCritter.mockResolvedValue(mockCritter);

      expect(
        crittersService.createCritter(mockCritter, mockCustomerUser),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('deleteCritter', () => {
    it('Calls CrittersRepository.delete and handles the error', async () => {
      crittersRepository.delete.mockResolvedValue('someId');
      expect(
        crittersService.deleteCritter('someId', mockCustomerUser),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('deleteCritter', () => {
    it('Calls CrittersRepository.delete and returns the result', async () => {
      crittersRepository.delete.mockResolvedValue(
        '8ec2b7a1-7b83-47fb-a694-fe99ec40c2f7',
      );
      const result = await crittersService.deleteCritter(
        '8ec2b7a1-7b83-47fb-a694-fe99ec40c2f7',
        mockAdminUser,
      );
    });
  });
});
