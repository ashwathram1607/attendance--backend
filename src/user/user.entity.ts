// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string 

  @Column({
    default: 'employee',
    nullable: false,
  })
  role: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  employeeId: string;

  @Column({ nullable: true })
  dateOfJoining: string;
}
