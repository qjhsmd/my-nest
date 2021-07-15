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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { LoginDTO } from '../user/user.dto';
@Controller('api/auth')
@ApiTags('权限管理')
export class AuthController {
  constructor(
    //     private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  // @ApiQuery({ name: 'user_name', description: 'string' })
  // @ApiQuery({ name: 'pass_word', description: 'string', required: false })
  @ApiBody({ description: '用户登录', type: LoginDTO })
  async login(@Body() user: User, @Request() req): Promise<any> {
    return await this.authService.login(req.user);
    // throw new HttpException(
    //   { code: 0, message: '登录成功', data: res },
    //   HttpStatus.OK,
    // );
  }

  @Get('logout')
  async logout(): Promise<any> {
    return {};
    // throw new HttpException({ code: 0, message: '请求成功' }, HttpStatus.OK);
  }
}
