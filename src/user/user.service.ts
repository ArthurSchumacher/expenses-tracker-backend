import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { SupabaseService } from 'src/supabase.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  async create(createUserDto: CreateUserDto, image: Express.Multer.File) {
    try {
      const { data } = await this.supabase
        .getSupabaseClient()
        .storage.from('images')
        .upload(image.originalname, image.buffer, {
          upsert: true,
        });

      const salt = await bcrypt.genSalt();

      return this.prisma.user.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          password: await bcrypt.hash(createUserDto.password, salt),
          profile_picture: data.path,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Falha ao cadastrar usuário. e: ${error.message}`,
      );
    }
  }
}
