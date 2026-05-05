import {
  Controller,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ GET all users
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
