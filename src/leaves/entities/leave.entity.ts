// src/leaves/entities/leave.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Leave {
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

  @Column({ default: 'Pending' })
  status: string;

  @CreateDateColumn()
  submittedAt: Date;
}
