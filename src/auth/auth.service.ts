import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'Arthur',
    password: 'password',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(authPayloadDto: AuthPayloadDto) {
    const { username, password } = authPayloadDto;
    const findUser = fakeUsers.find((user) => user.username === username);

    if (!findUser) return null;
    if (password === findUser.password) {
      const user = {
        id: findUser.id,
        username: findUser.username,
      };
      return this.jwtService.sign(user);
    }
  }
}
