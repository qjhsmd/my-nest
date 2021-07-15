import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArtcleEntity } from './artcle.entity';
import { ArtcleService } from './artcle.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('文章管理')
@Controller('api/artcle')
export class ArtcleController {
  constructor(private readonly artcleService: ArtcleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  @ApiOperation({ summary: '文章列表' })
  async findAll(@Query() query: any): Promise<ArtcleEntity> {
    return await this.artcleService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('saveArtcle')
  @ApiOperation({ summary: '创建文章' })
  async saveArtcle(@Body() artcle: ArtcleEntity): Promise<any> {
    return await this.artcleService.saveArtcle(artcle);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getArtcleDetail')
  @ApiOperation({ summary: '查询文章详情' })
  @ApiQuery({ name: 'id', description: 'string' })
  async getOne(@Query() query: any): Promise<any> {
    return await this.artcleService.findOne(query.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('updateArtcle')
  @ApiOperation({ summary: '修改文章详情' })
  async updateArtcle(@Body() artcle: ArtcleEntity): Promise<any> {
    return await this.artcleService.updateArtcle(artcle);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove')
  async remove(@Query() query: any): Promise<any> {
    return await this.artcleService.remove(query.id);
  }
}
