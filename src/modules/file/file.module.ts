import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';
import * as nuid from 'nuid';
let bascUrl = '';
if (process.env.NODE_ENV === 'development') {
  bascUrl = './';
  console.log('开发环境');
} else {
  bascUrl = '../';
  console.log('生产环境');
}
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: `${bascUrl}public/uploads/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  providers: [],
  controllers: [FileController],
  exports: [],
})
export class FileModule {}
