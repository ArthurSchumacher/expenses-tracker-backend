import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  async create(createIncomeDto: CreateIncomeDto, user: UserDto) {
    try {
      const { title, amount, description } = createIncomeDto;

      const income = await this.prisma.incomes.create({
        data: {
          title,
          amount,
          description,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return income;
    } catch (error) {
      throw new BadRequestException('Failed to add an income.', error.message);
    }
  }

  findAll(user: UserDto) {
    try {
      return this.prisma.incomes.findMany({
        where: {
          userId: user.id,
        },
      });
    } catch (error) {
      throw new BadRequestException(`Failed to find all user's income.`);
    }
  }

  remove(id: number) {
    return this.prisma.incomes.delete({ where: { id } });
  }
}
