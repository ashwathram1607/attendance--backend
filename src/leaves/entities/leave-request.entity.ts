// src/leaves/entities/leave-request.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  leaveType: string;

  @Column()
  fromDate: string;

  @Column()
  toDate: string;

  @Column()
  reason: string;

  @Column()
  status: string;

  @CreateDateColumn() // automatically set when inserted
  submittedAt: Date;
}
