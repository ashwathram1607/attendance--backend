import { IsDateString, IsNotEmpty,IsOptional,IsString } from "class-validator";
export class CreateHolidayDto{
    @IsNotEmpty()
    @IsString()
    holidayName!: string;
    @IsNotEmpty()
    @IsDateString()
    holidayDate!: string;
    @IsOptional()
    @IsString()
    description?: string;
    
}