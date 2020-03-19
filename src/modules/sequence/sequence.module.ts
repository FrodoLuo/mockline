import { Module } from '@nestjs/common';
import { SequenceController } from './controllers/sequence/sequence.controller';
import { SequenceService } from './services/sequence/sequence.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [SequenceController],
  providers: [SequenceService],
  exports: [SequenceService],
})
export class SequenceModule { }
