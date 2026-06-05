import { Controller, Post, Get, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  // Apply leave
  @Post()
  create(@Body() dto: CreateLeaveDto) {
    return this.leavesService.create(dto);
  }

  // Get all leaves
  @Get()
  findAll() {
    return this.leavesService.findAll();
  }

  // GET ALL BALANCES 
  @Get('balances')
  getAllBalances() {
    return this.leavesService.getAllBalances();
  }

  // GET SINGLE USER BALANCE
  @Get('balance/:name')
  getBalance(@Param('name') name: string) {
    return this.leavesService.getBalance(name);
  }

  // UPDATE LEAVE STATUS
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLeaveDto,
  ) {
    return this.leavesService.update(id, dto);
  }
}