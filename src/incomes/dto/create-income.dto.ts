import { IsNumber, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;
}
