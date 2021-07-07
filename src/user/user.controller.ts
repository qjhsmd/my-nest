import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('saveUser')
  async saveUser(@Query() user: User): Promise<void> {
    return this.userService.saveUser(user);
  }
  @Get('findAll')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get('findOne')
  async findOne(@Query() user: User): Promise<User> {
    return this.userService.findOne(user.id);
  }

  @Get('remove')
  async remove(@Query() user: User): Promise<void> {
    return this.userService.remove(user.id);
  }
  @Get('createMany')
  async createMany(@Query() users: User[]): Promise<void> {
    return this.userService.createMany(users);
  }
}
