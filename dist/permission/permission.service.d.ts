import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    create(data: Partial<Permission>): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    update(id: number, data: Partial<Permission>): Promise<Permission>;
}
