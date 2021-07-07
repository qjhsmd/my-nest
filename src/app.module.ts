import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminsModule } from './admin/admin.module';
import { DogModule } from './dog/dog.module';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from 'typeorm';
import { User } from './user/user.entity';
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
    DogModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private readonly connection: Connection) {}
}
