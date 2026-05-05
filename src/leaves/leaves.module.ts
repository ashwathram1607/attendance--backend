// src/leaves/leaves.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { LeaveRequest } from './entities/leave-request.entity';
import { LeaveBalance } from './entities/leave-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, LeaveBalance])],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class LeavesModule {}
