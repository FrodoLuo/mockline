import { Controller, Redirect, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @Redirect('/dashboard/overview')
    public defaultEntry() { }
}
