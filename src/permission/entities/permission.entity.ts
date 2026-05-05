import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
 
@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  name: string;
 
  @Column({ type: 'date' })
  date: string;
 
  @Column()
  startTime: string;
 
  @Column()
  endTime: string;
 
  @Column()
  reason: string;
}