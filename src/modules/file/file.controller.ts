import {
  Controller,
  Get,
  Post,
  UploadedFile,
  Delete,
  Query,
  Body,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
@ApiTags('文件管理')
export class FileController {
  // constructor(private readonly msgService: MsgService) {}

  @Post('uploadFile')
  @ApiOperation({ summary: '文件上传' })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
  console.log(file);
}
}
