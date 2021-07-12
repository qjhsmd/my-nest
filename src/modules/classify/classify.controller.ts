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
import { MyClassify } from './classify.entity';
import { ClassifyService } from './classify.service';
import { ApiTags, ApiOperation, ApiQuery} from '@nestjs/swagger';

@Controller('api/classify')
@ApiTags('文章分类')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Get('getClassify')
  @ApiOperation({ summary: '查询所有分类' })
  async getClassify(): Promise<MyClassify> {
    const res = await this.classifyService.findAll();
    console.log(res);
    throw new HttpException(
      { code: 0, message: '请求成功', data: res },
      HttpStatus.OK,
    );
  }

  @Get('postClassify')
  @ApiOperation({ summary: '创建分类' })
  @ApiQuery({ name: 'classify_name', description: 'string' })
  @ApiQuery({ name: 'pid', description: 'string', required: false })
  async postClassify(@Query() classify: MyClassify): Promise<MyClassify> {
    const res = await this.classifyService.saveClassify(classify);
    console.log(res);
    throw new HttpException(
      { code: 0, message: '请求成功', data: res },
      HttpStatus.OK,
    );
  }
}
