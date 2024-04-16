import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { SupabaseService } from 'src/supabase.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, SupabaseService],
})
export class UserModule {}
