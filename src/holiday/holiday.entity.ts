import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  holidayName!: string;

  @Column({ type: 'date' })
  holidayDate!: Date;

  @Column()
  year!: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}