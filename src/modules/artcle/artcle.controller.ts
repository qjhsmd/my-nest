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
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('api/artcle')
@ApiTags('文章管理')
export class ArtcleController {
  constructor(private readonly artcleService: ArtcleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  @ApiOperation({ summary: '文章列表' })
  async findAll(@Query() query: any): Promise<ArtcleEntity> {
    const res: any = await this.artcleService.findAll(query);
    throw new HttpException({ code: 0, data: { ...res } }, HttpStatus.OK);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('saveArtcle')
  @ApiOperation({ summary: '创建文章' })
  async saveArtcle(@Body() artcle: ArtcleEntity): Promise<ArtcleEntity> {
    const res = await this.artcleService.saveArtcle(artcle);
    throw new HttpException(
      { code: 0, message: '创建文章成功', data: { ...res } },
      HttpStatus.OK,
    );
  }
}
