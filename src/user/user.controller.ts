import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from 'src/auth/decorators/current_user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Serialize(UserDto)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.userService.create(createUserDto, image);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  myProfile(@CurrentUser() user: UserDto) {
    return this.userService.findOne(user);
  }
}
