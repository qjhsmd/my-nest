import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ArtcleEntity } from './artcle.entity';
import { ArtcleService } from './artcle.service';
import { CommentService } from './comment.service';
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
  constructor(
    private readonly artcleService: ArtcleService,
    private readonly commentService: CommentService,
  ) {}

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

  // 博客展示接口
  @Get('blogList')
  @ApiOperation({ summary: '博客展示列表' })
  async blogList(@Query() query: any): Promise<ArtcleEntity> {
    return await this.artcleService.blogFindAll(query);
  }

  @Get('blogDetail')
  @ApiOperation({ summary: '查询博客详情' })
  @ApiQuery({ name: 'id', description: 'string' })
  async getBlogDetail(
    @Query() query: any,
    @Headers('x-forwarded-for') header: any,
  ): Promise<any> {
    return await this.artcleService.findBlogOne(query.id, header);
  }

  @Get('blogIssue')
  @ApiOperation({ summary: '发布博客' })
  @ApiQuery({ name: 'id', description: 'string' })
  async blogIssue(@Query() query: any): Promise<any> {
    return await this.artcleService.issue(query.id);
  }

  @Get('blogUnissue')
  @ApiOperation({ summary: '取消发布博客' })
  @ApiQuery({ name: 'id', description: 'string' })
  async blogUnissue(@Query() query: any): Promise<any> {
    return await this.artcleService.unIssue(query.id);
  }

  @Get('addComment')
  @ApiOperation({ summary: '添加博客评论' })
  // @ApiQuery({ name: 'id', description: 'string' })
  async addComment(@Query() query: any): Promise<any> {
    return await this.commentService.addComment();
  }
}
