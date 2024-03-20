import { Module } from '@nestjs/common';
import { OutputController } from './outputs.controller';
import { OutputService } from './outputs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from '../loans/loan.entity';
import { Output } from './output.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Output])],
  controllers: [OutputController],
  providers: [OutputService]
})
export class OutputsModule {}