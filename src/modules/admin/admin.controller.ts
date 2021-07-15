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

  @Post('Hello')
  async create(
    @Body() admin: Admin,
    @Res({ passthrough: true }) res: Response,
  ) {
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
