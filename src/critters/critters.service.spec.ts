import { Test } from '@nestjs/testing';
import { CrittersRepository } from './critters.repository';
import { CrittersService } from './critters.service';

const mockCrittersRepository = () => ({
  getCritters: jest.fn(),
});

const mockUser = {
  username: 'Peirano357',
  id: 'dummyId',
  password: 'superEncryptedPassword',
  userType: 'administrator',
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
});
