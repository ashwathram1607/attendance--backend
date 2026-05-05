import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  create(@Body() data: CreateStaffDto) {
    return this.staffService.create(data);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateStaffDto) {
    return this.staffService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.staffService.remove(id);
  }
}
