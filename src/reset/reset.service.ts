import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { BalancesService } from '../balances/balances.service';

@Injectable()
export class ResetService {
  constructor(
    private eventsService: EventsService,
    private balancesService: BalancesService,
  ) {}

  async resetState() {
    await Promise.all([
      this.eventsService.deleteAll(),
      this.balancesService.deleteAll(),
    ]);
    await Promise.all([
      this.balancesService.create({ accountId: 100, currentBalance: 0 }),
      this.balancesService.create({ accountId: 300, currentBalance: 0 }),
    ]);
  }
}
