import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  // Apply Leave
  @Post()
  create(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leavesService.create(createLeaveDto);
  }

  // Get All Leave Requests
  @Get()
  findAll() {
    return this.leavesService.findAll();
  }

  // Get Employee Leave Balance
  @Get('balance/:name')
  getBalance(@Param('name') name: string) {
    return this.leavesService.getBalance(name);
  }

  // Update Leave Status (Approve / Reject)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLeaveDto: UpdateLeaveDto,
  ) {
    return this.leavesService.update(id, updateLeaveDto);
  }
}
