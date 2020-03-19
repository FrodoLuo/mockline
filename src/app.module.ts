import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api/api.controller';
import { ViewController } from './controllers/view/view.controller';
import { SequenceModule } from './modules/sequence/sequence.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    SequenceModule,
  ],
  controllers: [ApiController, AppController, ViewController],
  providers: [],
})
export class AppModule { }
