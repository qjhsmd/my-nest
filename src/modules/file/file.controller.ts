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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './file.dot';

@Controller('api/file')
@ApiTags('文件管理')
export class FileController {
  // constructor(private readonly msgService: MsgService) {}

  @Post('uploadFile')
  @ApiOperation({ summary: '文件上传' })
  // @ApiBody({ description: '用户登录', type: FileDTO })
  @ApiConsumes('multipart/form-data')
  // @ApiImplicitBody({
  //   name: 'file',
  //   required: true,
  //   description: 'List of cats',
  // })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return file;
  }
}
