import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { SequenceService } from '../../services/sequence/sequence.service';
import { SequenceItem, ISequenceConfig } from '../../services/sequence/sequence.model';

@Controller('sequence')
export class SequenceController {
    constructor(
        private sequenceService: SequenceService,
    ) { }
    @Post()
    public async saveSequence(
        @Body('path')
        path: string,

        @Body()
        config: ISequenceConfig,
    ) {
        return await this.sequenceService.saveSequence(path, config);
    }

    @Post('reset')
    public resetSequence(
        @Body('path')
        path: string
    ) {
        return this.sequenceService.resetSequence(path);
    }

    @Delete()
    public deleteSequence(
        @Body('path')
        path: string,
    ) {
        return this.sequenceService.deleteSequence(path);
    }
}
