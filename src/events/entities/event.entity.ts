import { AbstractEntity } from '../../entities/abstract.entity';
import { Column, Entity } from 'typeorm';
import { EventTypes } from './event-types.enum';

@Entity()
export class Event extends AbstractEntity {
  @Column()
  type: EventTypes;

  @Column('double', { nullable: true })
  origin?: number;

  @Column('double', { nullable: true })
  destination?: number;

  @Column('double')
  amount: number;
}
