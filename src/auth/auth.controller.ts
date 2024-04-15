import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CurrentUser } from './decorators/current_user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return { access_token: req.user };
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  whoami(@CurrentUser() user: UserDto) {
    return user;
  }
}
