import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Balance } from './entities/balance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBalanceDto } from './dto/create-balance.dto';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepo: Repository<Balance>,
  ) {}

  async findCurrentBalanceByAccountId(accountId: number) {
    return this.balanceRepo.findOne({
      where: { accountId },
      order: { createdAt: -1 },
    });
  }

  async create(createBalanceDto: CreateBalanceDto) {
    return this.balanceRepo.save(this.balanceRepo.create(createBalanceDto));
  }

  async sumBalance(accountId: number, amount: number) {
    const balance = await this.findCurrentBalanceByAccountId(accountId);

    if (!balance) {
      return null;
    }

    const currentBalance = balance.currentBalance + amount;
    return this.create({
      accountId: accountId,
      currentBalance,
    });
  }

  async subtractBalance(accountId: number, amount: number) {
    const balance = await this.findCurrentBalanceByAccountId(accountId);

    if (!balance) {
      return null;
    }

    const currentBalance = balance.currentBalance - amount;
    return this.create({
      accountId: accountId,
      currentBalance,
    });
  }

  deleteAll() {
    return this.balanceRepo.createQueryBuilder().delete().execute();
  }
}
