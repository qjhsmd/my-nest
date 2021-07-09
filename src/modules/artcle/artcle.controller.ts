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
import { Artcle } from './Artcle.entity';
import { ArtcleService } from './artcle.service';

@Controller('api/auth')
export class ArtcleController {
  constructor(private readonly artcleService: ArtcleService) {}

  @Get('logout')
  async logout(): Promise<Artcle> {
    throw new HttpException({ code: 0, message: '请求成功' }, HttpStatus.OK);
  }
}
