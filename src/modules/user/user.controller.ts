import {
  Controller,
  Get,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@Controller('api/user')
@ApiTags('用户信息')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('saveUser')
  @ApiOperation({ summary: '保存用户信息' })
  async saveUser(@Query() user: User): Promise<void> {
    return this.userService.saveUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  @ApiOperation({ summary: '查询所有用户信息' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  async findOne(@Query() user: User, @Request() req): Promise<User> {
    const res: any = await this.userService.findOne(user.id);
    throw new HttpException({ code: 0, data: { ...res } }, HttpStatus.OK);
  }

  @Get('remove')
  async remove(@Query() user: User): Promise<void> {
    return this.userService.remove(user.id);
  }
  // @Get('createMany')
  // async createMany(@Query() users: User[]): Promise<void> {
  //   return this.userService.createMany(users);
  // }
}
