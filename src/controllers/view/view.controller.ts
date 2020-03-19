import { Controller, Get, Res, Param, Query } from '@nestjs/common';
import { SequenceService } from '../../modules/sequence/services/sequence/sequence.service';
import { Response } from 'express';

@Controller('dashboard')
export class ViewController {
    constructor(
        private sequenceService: SequenceService,
    ) { }

    @Get('overview')
    public renderOverviewPage(
        @Res()
        res: Response,
    ) {
        return res.render('overview', {
            sequenceItems: this.sequenceService.getAllStoredSequenceItems(),
            sequenceCount: this.sequenceService.sequenceCount,
            requestCount: this.sequenceService.requestCount,
        });
    }

    @Get('create')
    public renderCreatePage(
        @Res()
        res: Response,
    ) {
        return res.render('edit', {
            sequenceItems: this.sequenceService.getAllStoredSequenceItems(),
        });
    }

    @Get('edit')
    public renderEditPage(
        @Query('path')
        path: string,

        @Res()
        res: Response,
    ) {
        if (!path || path.length === 0) {
            return res.redirect('/dashboard/404');
        }
        return res.render('edit', {
            sequenceItems: this.sequenceService.getAllStoredSequenceItems(),
            currentConfig: JSON.stringify(this.sequenceService.getSequence(path)),
            path,
        });
    }

    @Get('404')
    public notFoundErrorPage(
        @Res()
        res: Response,
    ) {
        return res.render('404', {
            sequenceItems: this.sequenceService.getAllStoredSequenceItems(),
        });

    }
}
