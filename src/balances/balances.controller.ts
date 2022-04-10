import { Controller, Get, Query, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { BalancesService } from './balances.service';

@Controller('balance')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  async findOne(@Query('account_id') accountId: string, @Response() res: Res) {
    const balance = await this.balancesService.findCurrentBalanceByAccountId(
      +accountId,
    );

    if (!balance) {
      res.status(404).send('0');
      return;
    }

    res.send(`${balance?.currentBalance ?? 0}`);
  }
}
