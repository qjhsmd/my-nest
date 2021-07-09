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

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('saveUser')
  async saveUser(@Query() user: User): Promise<void> {
    return this.userService.saveUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
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
