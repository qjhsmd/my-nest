import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
// import { MsgEntity } from './social.entity';
import { MsgService } from './social.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('api/social')
@ApiTags('社交信息')
export class ClassifyController {
  constructor(private readonly msgService: MsgService) {}

  @Get('findAll')
  @ApiOperation({ summary: '查询所有社交信息' })
  async findAll(): Promise<any> {
    return await this.msgService.findAll();
  }

  // @Post('postMsg')
  // @ApiOperation({ summary: '创建留言' })
  // async postMsg(@Body() msg: MsgEntity): Promise<any> {
  //   return await this.msgService.saveMsg(msg);
  // }

  // @Delete('removeMsg')
  // @ApiOperation({ summary: '删除留言' })
  // @ApiQuery({ name: 'id', description: 'number' })
  // async deleteMsg(@Query() query: any): Promise<any> {
  //   return await this.msgService.remove(query.id);
  // }
}
