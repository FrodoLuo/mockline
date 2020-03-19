import { Test, TestingModule } from '@nestjs/testing';
import { SequenceController } from './sequence.controller';
import { SequenceModule } from '../../sequence.module';

describe('Sequence Controller', () => {
  let controller: SequenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequenceModule],
    }).compile();

    controller = module.get<SequenceController>(SequenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
