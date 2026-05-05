import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn() // ✅ automatically increments
  id: number;

  @Column()
  username: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date | null;

  @Column({ type: 'int', default: 0 })
  workedDuration: number;

  @Column({ type: 'int', default: 0 })
  breakCount: number;

  @Column({ type: 'int', default: 0 })
  totalBreakDuration: number;

  @Column({ type: 'timestamp', nullable: true })
  currentBreakStart: Date | null;
}
