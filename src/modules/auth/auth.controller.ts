import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    //     private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: User, @Request() req): Promise<User> {
    return this.authService.login(req.user);
  }

  @Get('logout')
  async logout(): Promise<User> {
    throw new HttpException({ code: 0, message: '请求成功' }, HttpStatus.OK);
  }
}
