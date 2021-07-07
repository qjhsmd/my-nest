import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';
import { Admin } from './admin.dto';
// import { Admin } from './admin.interface';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Get('Hello')
  // @HttpCode(500)
  // getHello(@Req() request: Request): string {
  //   console.log(request);
  //   return this.adminService.getHello();
  // }
  @Post('Hello')
  async create(
    @Body() admin: Admin,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('========');
    console.log(admin);
    console.log(Admin.name);
    console.log('========');
    this.adminService.create(admin);
    // return 'This action adds a new cat';
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    res.status(HttpStatus.OK);
    return this.adminService.findAll();
  }

  @Get('findAll')
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }
}
