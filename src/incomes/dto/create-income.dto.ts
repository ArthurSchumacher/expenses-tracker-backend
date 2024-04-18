import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  @IsDate()
  date: Date;
}
