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
import { ArtcleEntity } from './Artcle.entity';
import { ArtcleService } from './artcle.service';

@Controller('api/auth')
export class ArtcleController {
  constructor(private readonly artcleService: ArtcleService) {}

  @Get('logout')
  async logout(): Promise<ArtcleEntity> {
    throw new HttpException({ code: 0, message: '请求成功' }, HttpStatus.OK);
  }
}
