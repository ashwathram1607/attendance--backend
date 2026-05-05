import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  employeeId: string;

  @Column()
  employeeName: string;

  @Column()
  designation: string;

  @Column()
  salary: number;

  @Column()
  pancard: string;

  @Column()
  dateOfJoining: string;

  @Column()
  location: string;
}
