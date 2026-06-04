import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 6 })
  sickLeave: number;

  @Column({ default: 6 })
  personalLeave: number;

  @Column({ default: 12 })
  earnedLeave: number;

  @Column({ default: 0 })
  maternityLeave: number;
}
