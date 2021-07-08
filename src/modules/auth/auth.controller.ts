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
import { UserService } from '../user/user.service';
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
  async login(@Body() user: User): Promise<User> {
    // return request.user;
    return this.authService.login(user);
  }

  //   async saveUser(
  //     @Body() user: User,
  //     @Res({ passthrough: true }) res: Response,
  //   ): Promise<any> {
  //   }
}
