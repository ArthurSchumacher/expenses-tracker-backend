import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserDto } from 'src/auth/dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto, user: UserDto) {
    try {
      const { title, amount, description, date } = createExpenseDto;

      return await this.prisma.expenses.create({
        data: {
          title,
          amount,
          date,
          description,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to add an expense.');
    }
  }

  findAll(user: UserDto) {
    try {
      return this.prisma.expenses.findMany({
        where: {
          userId: user.id,
        },
      });
    } catch (error) {
      throw new BadRequestException(`Failed to find all user's expenses.`);
    }
  }

  remove(id: number) {
    return this.prisma.expenses.delete({ where: { id } });
  }
}
