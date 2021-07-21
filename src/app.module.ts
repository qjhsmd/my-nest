import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { CacheService } from './modules/app/cache.service';

import { AdminsModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArtcleModule } from './modules/artcle/artcle.module';
import { ClassifyModule } from './modules/classify/classify.module';
import { MsgModule } from './modules/msg/msg.module';
import { SocialModule } from './modules/social/social.module';
import { FileModule } from './modules/file/file.module';
import { VisitsModule } from './modules/visits/visits.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { ArtcleEntity } from './modules/artcle/artcle.entity';
import { MyClassify } from './modules/classify/classify.entity';
import { MsgEntity } from './modules/msg/msg.entity';
import { VisitsEntity } from './modules/visits/visits.entity';
import { LoggerMiddleware } from './middleware/logger.middleware';

import { RedisModule } from 'nestjs-redis';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '106.53.251.59',
      port: 3306,
      username: 'root',
      password: '_Q,j&h*54618482',
      database: 'blog',
      entities: [User, MyClassify, ArtcleEntity, MsgEntity, VisitsEntity],
      synchronize: true,
    }),
    RedisModule.register({
      port: 6699,
      host: '106.53.251.59',
      password: 'qjh15608351443',
    }),
    AdminsModule,
    UserModule,
    AuthModule,
    ClassifyModule,
    ArtcleModule,
    MsgModule,
    SocialModule,
    FileModule,
    VisitsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheService],
  exports: [CacheService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
