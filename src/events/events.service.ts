import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { BalancesService } from '../balances/balances.service';
import { EventTypes } from './entities/event-types.enum';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private balancesService: BalancesService,
  ) {}

  async createDeposit(createEventDto: CreateEventDto) {
    const eventPayload = await this.eventRepository.create(createEventDto);
    const destinationBalance = await this.balancesService.sumBalance(
      createEventDto.destination,
      eventPayload.amount,
    );

    if (!destinationBalance) {
      return null;
    }

    const event = await this.eventRepository.save(eventPayload);

    return {
      destination: {
        id: event.destination,
        balance: destinationBalance.currentBalance,
      },
    };
  }

  async createWithdraw(createEventDto: CreateEventDto) {
    const eventPayload = await this.eventRepository.create(createEventDto);
    const originBalance = await this.balancesService.subtractBalance(
      eventPayload.origin,
      eventPayload.amount,
    );

    if (!originBalance) {
      return null;
    }

    const event = await this.eventRepository.save(eventPayload);

    return {
      origin: {
        id: event.origin,
        balance: originBalance.currentBalance,
      },
    };
  }

  async createTransfer(createEventDto: CreateEventDto) {
    const eventPayload = await this.eventRepository.create(createEventDto);

    const [originBalance, destinationBalance] = await Promise.all([
      this.balancesService.subtractBalance(
        createEventDto.origin,
        eventPayload.amount,
      ),
      this.balancesService.sumBalance(
        createEventDto.destination,
        eventPayload.amount,
      ),
    ]);

    if (!originBalance || !destinationBalance) {
      return null;
    }

    const event = await this.eventRepository.save(eventPayload);

    return {
      origin: {
        id: event.origin,
        balance: originBalance.currentBalance,
      },
      destination: {
        id: event.destination,
        balance: destinationBalance.currentBalance,
      },
    };
  }

  async create(createEventDto: CreateEventDto) {
    switch (createEventDto.type) {
      case EventTypes.Deposit:
        const depositResponse = await this.createDeposit(createEventDto);

        if (!depositResponse) {
          return null;
        }

        return depositResponse;
      case EventTypes.Withdraw:
        const withdrawResponse = await this.createWithdraw(createEventDto);

        if (!withdrawResponse) {
          return null;
        }

        return withdrawResponse;
      case EventTypes.Transfer:
        const transferResponse = await this.createTransfer(createEventDto);

        if (!transferResponse) {
          return null;
        }

        return transferResponse;
      default:
        return null;
    }
  }

  async deleteAll() {
    return this.eventRepository.createQueryBuilder().delete().execute();
  }
}
