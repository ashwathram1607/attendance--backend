import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ default: 'Pending' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  submittedAt: Date;
}
