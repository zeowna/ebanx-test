import { Body, Controller, Post, Response } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Response as Res } from 'express';

@Controller('event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @Response() res: Res) {
    const event = await this.eventsService.create(createEventDto);

    if (!event) {
      res.status(404).send('0');
      return;
    }

    res.status(201).send(event);
  }
}
