import { Test, TestingModule } from '@nestjs/testing';
import { CrittersController } from './critters.controller';
import { CrittersService } from './critters.service';
import { CreateCritterDto } from '../critters/dto/create-critter.dto';
import { UserTypeEnum } from '../auth/enum/user-type.enum';
import { GetCritterFilterDto } from './dto/get-critters-filter.dto';
import { ConfigService } from '@nestjs/config';
import { Critter } from './critter.entity';
import { UpdateCritterDto } from './dto/update-critter.dto';
import { User } from 'src/auth/user.entity';

describe('CrittersController Unit Tests', () => {
  let crittersController: CrittersController;
  let spyService: CrittersService;

  const mockAdminUser = {
    username: 'Peirano357Admin',
    id: 'dummyId',
    password: 'superEncryptedPassword',
    userType: UserTypeEnum.administrator,
  };

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: CrittersService,
      useFactory: () => ({
        createCritter: jest.fn().mockImplementation((critter: Critter) =>
          Promise.resolve({
            id: '5ec8042f-ed6c-4ceb-bc39-7dbfc094f01a',
            ...critter,
          }),
        ),
        updateCritter: jest
          .fn()
          .mockImplementation(
            (
              id: string,
              name: string,
              description: string,
              imageUrl: string,
              user: User,
            ) =>
              Promise.resolve({
                id: '5ec8042f-ed6c-4ceb-bc39-7dbfc094f01a',
                name: name,
                description: description,
                imageUrl: imageUrl,
              }),
          ),
        getCritters: jest.fn().mockResolvedValue([
          {
            name: 'HammerHead Shark',
            description:
              'The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,300 lb).[3][4] They are usually light gray and have a greenish tint. Their bellies are white, which allows them to blend into the background when viewed from below and sneak up to their prey.[5] Their heads have lateral projections that give them a hammer-like shape.',
            imageUrl:
              'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20hammerhead.jpg',
          },
          {
            name: 'Great Barracuda',
            description:
              'Great barracudas are large fish, and one of the largest of the Barracudas. Mature specimens are usually around 60–100 cm (24–39 in) in length and weigh 2.5–9.0 kg (5.5–19.8 lb). Exceptionally large specimens can exceed 1.5 m (4.9 ft) and weigh over 23 kg (51 lb). ',
            imageUrl:
              'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20barracuda.jpg',
          },
        ]),
        getCritterById: jest.fn().mockImplementation((id: string) =>
          Promise.resolve({
            id: id,
            name: 'HammerHead Shark',
            description:
              'The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,300 lb).[3][4] They are usually light gray and have a greenish tint. Their bellies are white, which allows them to blend into the background when viewed from below and sneak up to their prey.[5] Their heads have lateral projections that give them a hammer-like shape.',
            imageUrl:
              'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20hammerhead.jpg',
          }),
        ),

        deleteCritter: jest.fn().mockResolvedValue(true),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CrittersController],
      providers: [ConfigService, CrittersService, ApiServiceProvider],
    }).compile();

    crittersController = app.get<CrittersController>(CrittersController);
    spyService = app.get<CrittersService>(CrittersService);
  });

  it('calling createCritter method', () => {
    const dto = new CreateCritterDto();
    expect(crittersController.createCritter(dto, mockAdminUser)).not.toEqual(
      null,
    );
  });

  it('calling getCritters method', () => {
    const dto = new GetCritterFilterDto();
    crittersController.getCritters(dto, mockAdminUser);
    expect(spyService.getCritters).toHaveBeenCalled();
  });

  it('calling getCritterById method', () => {
    const id = 'someId';

    crittersController.getCritterById(id, mockAdminUser);
    expect(spyService.getCritterById).toHaveBeenCalled();
  });

  it('calling createCritter method', () => {
    const dto = new CreateCritterDto();

    dto.name = 'HammerHead Shark';
    dto.description =
      'The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,300 lb).[3][4] They are usually light gray and have a greenish tint. Their bellies are white, which allows them to blend into the background when viewed from below and sneak up to their prey.[5] Their heads have lateral projections that give them a hammer-like shape.';
    dto.imageUrl =
      'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20hammerhead.jpg';

    crittersController.createCritter(dto, mockAdminUser);
    expect(spyService.createCritter).toHaveBeenCalled();
  });

  it('Should create a new critter', async () => {
    const newCritter: CreateCritterDto = {
      name: 'HammerHead Shark',
      description:
        'The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,300 lb).[3][4] They are usually light gray and have a greenish tint. Their bellies are white, which allows them to blend into the background when viewed from below and sneak up to their prey.[5] Their heads have lateral projections that give them a hammer-like shape.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20hammerhead.jpg',
    };
    await expect(
      crittersController.createCritter(newCritter, mockAdminUser),
    ).resolves.toEqual({
      id: '5ec8042f-ed6c-4ceb-bc39-7dbfc094f01a',
      ...newCritter,
    });
  });

  it('Should return an array of critters', async () => {
    const getCritterFilterDto: GetCritterFilterDto = {};

    await expect(
      crittersController.getCritters(getCritterFilterDto, mockAdminUser),
    ).resolves.toEqual([
      {
        name: 'HammerHead Shark',
        description:
          'The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,300 lb).[3][4] They are usually light gray and have a greenish tint. Their bellies are white, which allows them to blend into the background when viewed from below and sneak up to their prey.[5] Their heads have lateral projections that give them a hammer-like shape.',
        imageUrl:
          'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20hammerhead.jpg',
      },
      {
        name: 'Great Barracuda',
        description:
          'Great barracudas are large fish, and one of the largest of the Barracudas. Mature specimens are usually around 60–100 cm (24–39 in) in length and weigh 2.5–9.0 kg (5.5–19.8 lb). Exceptionally large specimens can exceed 1.5 m (4.9 ft) and weigh over 23 kg (51 lb). ',
        imageUrl:
          'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20barracuda.jpg',
      },
    ]);
  });

  it('Should get a single critter', async () => {
    await expect(
      crittersController.getCritterById(
        '5ec8042f-ed6c-4ceb-bc39-7dbfc094f01a',
        mockAdminUser,
      ),
    ).resolves.toEqual({
      id: '5ec8042f-ed6c-4ceb-bc39-7dbfc094f01a',
      name: 'HammerHead Shark',
      description:
        'The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,300 lb).[3][4] They are usually light gray and have a greenish tint. Their bellies are white, which allows them to blend into the background when viewed from below and sneak up to their prey.[5] Their heads have lateral projections that give them a hammer-like shape.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20hammerhead.jpg',
    });
  });

  it('should return that it deleted a critter', async () => {
    await expect(
      crittersController.deleteCritter(
        '5ec8042f-ed6c-4ceb-bc39-7dbfc094f01a',
        mockAdminUser,
      ),
    ).resolves.toEqual(true);
  });

  it('Should update an existent critter', async () => {
    const critter1: UpdateCritterDto = {
      name: 'modified name',
      description: 'modified description',
      imageUrl: 'modified image',
    };

    await expect(
      crittersController.updateCritter(
        '5ec8042f-ed6c-4ceb-bc39-7dbfc094f01a',
        critter1,
        mockAdminUser,
      ),
    ).resolves.toEqual({
      ...critter1,
      id: '5ec8042f-ed6c-4ceb-bc39-7dbfc094f01a',
    });
  });
});
