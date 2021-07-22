import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  Body,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('用户信息')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('saveUser')
  @ApiOperation({ summary: '管理员创建用户' })
  async saveUser(@Body() user: User): Promise<any> {
    return await this.userService.saveUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  @ApiOperation({ summary: '查询所有用户信息' })
  async findAll(@Query() query: any): Promise<User[]> {
    return await this.userService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  async findOne(@Request() req: any): Promise<any> {
    return await this.userService.findOne(req.user.id);
  }

  @Put('updateUser')
  @ApiOperation({ summary: '更新用户信息' })
  async updateUser(@Body() user: User): Promise<any> {
    return await this.userService.saveUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('remove')
  async remove(@Query() user: User): Promise<any> {
    return await this.userService.remove(user.id);
  }

  @ApiOperation({ summary: '博客查询基本信息' })
  @Get('baseInfo')
  async baseInfo(): Promise<any> {
    const res: any = await this.userService.baseInfo();
    return res[0];
  }
  // @Get('createMany')
  // async createMany(@Query() users: User[]): Promise<void> {
  //   return this.userService.createMany(users);
  // }
}
