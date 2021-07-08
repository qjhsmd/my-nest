import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminsModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
// import { LoginModule } from './modules/login/login.module';

import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from 'typeorm';
import { User } from './modules/user/user.entity';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '106.53.251.59',
      port: 3306,
      username: 'root',
      password: '_Q,j&h*54618482',
      database: 'blog',
      entities: [User],
      synchronize: true,
    }),
    AdminsModule,
    UserModule,
    // LoginModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private readonly connection: Connection) {}
}
