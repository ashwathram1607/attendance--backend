import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffService {
    private staffRepo;
    constructor(staffRepo: Repository<Staff>);
    create(data: CreateStaffDto): Promise<Staff>;
    findAll(): Promise<Staff[]>;
    findOne(id: number): Promise<Staff>;
    update(id: number, data: UpdateStaffDto): Promise<Staff>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
