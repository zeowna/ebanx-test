import { Event } from '../entities/event.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateEventDto extends OmitType(Event, ['id']) {}
