// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...rest } = user;
    return rest;
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('User not found');
    }

    return { message: 'User deleted successfully' };
  }
  async updateUser(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: data.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, data);

    return this.userRepository.save(user);
  }
}
