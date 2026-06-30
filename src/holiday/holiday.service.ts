import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from './holiday.entity';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private holidayRepo: Repository<Holiday>,
  ) {}

  // Add Holiday
  async create(createHolidayDto: CreateHolidayDto) {
    const holidayDate = new Date(createHolidayDto.holidayDate);
    const year = holidayDate.getFullYear();

    const existingHoliday = await this.holidayRepo.findOne({
      where: {
        holidayDate,
      },
    });

    if (existingHoliday) {
      throw new BadRequestException(
        'Holiday already exists for this date',
      );
    }

    const holiday = this.holidayRepo.create({
      ...createHolidayDto,
      holidayDate,
      year,
    });

    const savedHoliday = await this.holidayRepo.save(holiday);

    return {
      message: 'Holiday added successfully',
      holiday: savedHoliday,
    };
  }

  // Get All Holidays
  async findAll(year?: number) {
    if (year) {
      return this.holidayRepo.find({
        where: { year },
        order: { holidayDate: 'ASC' },
      });
    }

    return this.holidayRepo.find({
      order: { holidayDate: 'ASC' },
    });
  }

  // Get Single Holiday
  async findOne(id: number) {
    const holiday = await this.holidayRepo.findOne({
      where: { id },
    });

    if (!holiday) {
      return {
        message: 'Holiday not found',
      };
    }

    return holiday;
  }

  // Update Holiday
  async update(id: number, updateHolidayDto: UpdateHolidayDto) {
    const holiday = await this.holidayRepo.findOne({
      where: { id },
    });

    if (!holiday) {
      return {
        message: 'Holiday not found',
      };
    }

    if (updateHolidayDto.holidayDate) {
      const date = new Date(updateHolidayDto.holidayDate);

      holiday.holidayDate = date;
      holiday.year = date.getFullYear();
    }

    Object.assign(holiday, updateHolidayDto);

    return this.holidayRepo.save(holiday);
  }

  // Delete Holiday
  async remove(id: number) {
    const holiday = await this.holidayRepo.findOne({
      where: { id },
    });

    if (!holiday) {
      return {
        message: 'Holiday not found',
      };
    }

    await this.holidayRepo.remove(holiday);

    return {
      message: 'Holiday deleted successfully',
    };
  }
}