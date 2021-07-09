import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'user_name',
      passwordField: 'pass_word',
    });
    this.userService = userService;
  }

  async validate(user_name: string, pass_word: string): Promise<User> {
    const user = await this.userService.userLogin(user_name, pass_word);
    if (user) return user;
    else throw new UnauthorizedException('incorrect username or password');
  }
}
