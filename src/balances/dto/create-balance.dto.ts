import { Balance } from '../entities/balance.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateBalanceDto extends OmitType(Balance, ['id']) {}
