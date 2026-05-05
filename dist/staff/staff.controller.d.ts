import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    create(data: CreateStaffDto): Promise<import("./entities/staff.entity").Staff>;
    findAll(): Promise<import("./entities/staff.entity").Staff[]>;
    findOne(id: number): Promise<import("./entities/staff.entity").Staff>;
    update(id: number, data: UpdateStaffDto): Promise<import("./entities/staff.entity").Staff>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
