import { Test, TestingModule } from '@nestjs/testing';
import { SequenceService } from './sequence.service';
import { SequenceModule } from '../../sequence.module';

describe('SequenceService', () => {
  let service: SequenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequenceModule],
    }).compile();

    service = module.get<SequenceService>(SequenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
