import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../entities/abstract.entity';

@Entity()
export class Balance extends AbstractEntity {
  @Column('int')
  accountId: number;

  @Column('double', { default: 0 })
  currentBalance: number;
}
