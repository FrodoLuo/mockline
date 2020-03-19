import { Test, TestingModule } from '@nestjs/testing';
import { ViewController } from './view.controller';
import { SequenceModule } from '../../modules/sequence/sequence.module';

describe('View Controller', () => {
  let controller: ViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequenceModule],
      controllers: [ViewController],
    }).compile();

    controller = module.get<ViewController>(ViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
