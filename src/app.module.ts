import { CreatedController } from './webhook/created/created.controller';
import { DispatchedController } from './webhook/dispatched/dispatched.controller';
import { ArrivedController } from './webhook/arrived/arrived.controller';
import { PobController } from './webhook/pob/pob.controller';
import { ModifiedController } from './webhook/modified/modified.controller';
import { VehicleTracksController } from './webhook/vehicletracks/vehicletracks.controller';
import { RunningLateController } from './webhook/runninglate/runninglate.controller';
import { CronController } from './automator/autocancel/autocancel.controller';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import ApiService from './automator/autocancel/autocancel.service';
import { UalabeeController } from './ualabee/controllers/ualabee.controller';
import { UalabeeService } from './ualabee/services/ualabee.service';
import { CancelledController } from './webhook/cancelled/cancelled.controller';
import { CompletedController } from './webhook/completed/completed.controller';
import { CatchallController } from './webhook/catchall/catchall.controller';

@Module({
  controllers: [
    CreatedController,
    DispatchedController,
    ArrivedController,
    PobController,
    ModifiedController,
    VehicleTracksController,
    RunningLateController,
    CronController,
    UalabeeController,
    CancelledController,
    CompletedController,
    CatchallController,
  ],
  imports: [HttpModule],
  providers: [ApiService, UalabeeService],
})
export class AppModule {}
