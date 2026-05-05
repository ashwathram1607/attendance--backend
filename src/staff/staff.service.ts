import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepo: Repository<Staff>,
  ) {}

  // Create
  create(data: CreateStaffDto) {
    const staff = this.staffRepo.create(data);
    return this.staffRepo.save(staff);
  }

  // Get All
  findAll() {
    return this.staffRepo.find();
  }

  // Get One
  async findOne(id: number) {
    const staff = await this.staffRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  // Update
  async update(id: number, data: UpdateStaffDto) {
    await this.findOne(id);
    await this.staffRepo.update(id, data);
    return this.findOne(id);
  }

  // Delete
  async remove(id: number) {
    await this.findOne(id);
    return this.staffRepo.delete(id);
  }
}
