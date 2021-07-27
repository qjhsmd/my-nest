import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
// api文档插件
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 配置静态文件
  app.useStaticAssets(join(__dirname, '../', 'public'), {
    prefix: '/public/',
  });
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options);
  // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/doc-api', app, document);

  await app.listen(3000);
  readVersion();
  console.log(process.env.NODE_ENV);
}
bootstrap();

// DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
const options = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('nest入门接口标题')
  .setDescription('使用nest书写的常用性接口') // 文档介绍
  .setVersion('1.0.0') // 文档版本
  .addTag('用户,安全') // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
  // .setBasePath('http://localhost:5000')
  .build();

async function readVersion() {
  try {
    const data = await readFileSync(
      join(__dirname, '../src', './version.md'),
      'utf-8',
    );
    // 等待操作结果返回，然后打印结果
    const version = data.split('\r\n');
    console.log(
      '当前版本：' +
        version[version.length - 1] +
        '\r\n' +
        '文档地址：http://localhost:3000/doc-api',
    );
  } catch (e) {
    console.log('读取文件发生错误');
  }
}
