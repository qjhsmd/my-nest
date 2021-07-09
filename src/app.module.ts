import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminsModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArtcleModule } from './modules/artcle/artcle.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import {Artcle} from './modules/artcle/artcle.entity'
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '106.53.251.59',
      port: 3306,
      username: 'root',
      password: '_Q,j&h*54618482',
      database: 'blog',
      entities: [User, Artcle],
      synchronize: true,
    }),
    AdminsModule,
    UserModule,
    AuthModule,
    ArtcleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
