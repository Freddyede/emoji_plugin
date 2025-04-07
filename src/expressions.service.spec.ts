import { Test, TestingModule } from '@nestjs/testing';
import { ExpressionsService } from './expressions.service';

describe('ExpressionsService', () => {
  let service: ExpressionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpressionsService],
    }).compile();

    service = module.get<ExpressionsService>(ExpressionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
