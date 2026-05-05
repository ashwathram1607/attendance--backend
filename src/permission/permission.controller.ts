import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // Create a new permission request
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  // Get all permission requests
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  // Update permission status (Approve / Reject)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, updatePermissionDto);
  }
}