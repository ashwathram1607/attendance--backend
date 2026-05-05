// src/employee/employee.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('employee')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeeController {
  @Get('profile')
  @Roles('employee')
  getEmployeeProfile() {
    return { message: 'Welcome Employee! Here’s your profile data.' };
  }
}
