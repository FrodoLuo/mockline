import { Controller, Get, Req, Post, Delete, Put, Patch } from '@nestjs/common';
import { SequenceService } from '../../modules/sequence/services/sequence/sequence.service';
import { Request } from 'express';

@Controller('api')
export class ApiController {

    constructor(
        private sequenceService: SequenceService,
    ) { }

    @Get('*')
    public queryGETData(@Req() req: Request) {
        return this.sequenceService.getMockData(req.path);
    }
    @Post('*')
    public queryPostData(@Req() req: Request) {
        return this.sequenceService.getMockData(req.path);
    }
    @Delete('*')
    public queryDeleteData(@Req() req: Request) {
        return this.sequenceService.getMockData(req.path);
    }
    @Put('*')
    public queryPutData(@Req() req: Request) {
        return this.sequenceService.getMockData(req.path);
    }
    @Patch('*')
    public queryPatchData(@Req() req: Request) {
        return this.sequenceService.getMockData(req.path);
    }
}
