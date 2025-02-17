
import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './schema/cat.schema';


describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CatsController],
        providers: [CatsService],
      }).compile();

    catsService = moduleRef.get(CatsService);
    catsController = moduleRef.get(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
        const result: Cat[] = [{
            name: 'Test Cat',
            age: 100,
            breed: 'Test Breed'
          }];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
