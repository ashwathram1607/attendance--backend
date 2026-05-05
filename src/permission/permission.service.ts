import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  // ✅ CREATE NEW PERMISSION
  async create(data: Partial<Permission>): Promise<Permission> {
    const permission = this.permissionRepository.create(data);
    return await this.permissionRepository.save(permission);
  }

  // ✅ GET ALL PERMISSIONS
  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  // ✅ UPDATE PERMISSION
  async update(id: number, data: Partial<Permission>): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }

    
    Object.assign(permission, data);

    return await this.permissionRepository.save(permission);
  }
}