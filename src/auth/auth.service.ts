import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(authPayloadDto: AuthPayloadDto) {
    const { username, password } = authPayloadDto;
    const findUser = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!findUser) return null;
    if (await bcrypt.compare(password, findUser.password)) {
      const user = {
        id: findUser.id,
        username: findUser.username,
      };
      return this.jwtService.sign(user);
    }
  }
}
