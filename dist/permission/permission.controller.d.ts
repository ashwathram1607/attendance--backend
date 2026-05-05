import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("./entities/permission.entity").Permission>;
    findAll(): Promise<import("./entities/permission.entity").Permission[]>;
    update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<import("./entities/permission.entity").Permission>;
}
