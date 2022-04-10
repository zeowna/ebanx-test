import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { EventsModule } from '../events/events.module';
import { BalancesModule } from '../balances/balances.module';

@Module({
  imports: [EventsModule, BalancesModule],
  controllers: [ResetController],
  providers: [ResetService],
})
export class ResetModule {}
