import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

const decimalTransformer = {
  to: (value: number) => value,
  from: (value: string) => Number(value),
};

@Entity('payslips')
export class Payslip {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ name: 'employee_id', type: 'varchar', default: '' })
employeeId!: string;




  @Column({ name: 'employee_name', default: '' })
  employeeName!: string;

  @Column({ default: '' })
  designation!: string;

  @Column({ name: 'pan_card', default: '' })
  panCard!: string;

  @Column({ name: 'date_of_joining', type: 'date', nullable: true })
  dateOfJoining!: Date;

  @Column({ default: '' })
  month!: string;

  @Column({ default: 0 })
  year!: number;

  @Column({ name: 'financial_year', default: '' })
  financialYear!: string;

  // ================= SALARY =================

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: decimalTransformer,
  })
  salary!: number;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  bonus!: number;

  @Column({ name: 'payable_days', default: 0 })
  payableDays!: number;

  @Column({ name: 'paid_days', default: 0 })
  paidDays!: number;

  // ================= EARNINGS =================

  @Column({
    name: 'basic_pay',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  basicPay!: number;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  hra!: number;

  @Column({
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  conveyance!: number;

  @Column({
    name: 'medical_allowance',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  medicalAllowance!: number;

  @Column({
    name: 'special_allowance',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  specialAllowance!: number;

  @Column({
    name: 'other_allowance',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  otherAllowance!: number;

  @Column({
    name: 'gross_salary',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  grossSalary!: number;

  @Column({
    name: 'net_salary',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  netSalary!: number;

  // ================= YTD =================

  @Column({
    name: 'ytd_basic_pay',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  ytdBasicPay!: number;

  @Column({
    name: 'ytd_hra',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  ytdHra!: number;

  @Column({
    name: 'ytd_conveyance',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  ytdConveyance!: number;

  @Column({
    name: 'ytd_medical_allowance',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  ytdMedicalAllowance!: number;

  @Column({
    name: 'ytd_special_allowance',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  ytdSpecialAllowance!: number;

  @Column({
    name: 'ytd_other_allowance',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  ytdOtherAllowance!: number;

  @Column({
    name: 'ytd_bonus',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  ytdBonus!: number;

  @Column({
    name: 'ytd_net_salary',
    type: 'decimal',
    default: 0,
    transformer: decimalTransformer,
  })
  ytdNetSalary!: number;

  @Column({ default: 'Pending' })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
