// import {
//   Controller,
//   Get,
//   Post,
//   Query,
//   Body,
//   Res,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { UserService } from '../user/user.service';
// import { User } from '../user/user.entity';

// import { AuthService } from '../auth/auth.service';
// // import jwt from 'jsonwebtoken';

// @Controller('api/login')
// export class LoginController {
//   constructor(
//     private readonly userService: UserService,
//     private readonly authService: AuthService,
//   ) {}

//   @Post('userLogin')
//   async saveUser(
//     @Body() user: User,
//     @Res({ passthrough: true }) res: Response,
//   ): Promise<any> {
//     const result = {
//       accesstoken: '',
//       user: {},
//     };
//     // user.pass_word = this.utilService.decryption(data.password);
//     const res1: User = await this.userService.findOneByUserName(user.user_name);
//     console.log(res1);
//     if (res1 && res1.pass_word == user.pass_word) {
//       const userInfo = {
//         jti: 1,
//         iss: 'cnnngt.top',
//         user: user.user_name,
//         eamil: 'qjh886@qq.com',
//       };
//       // 颁发 token
//       const tokenInfo = await this.authService.genToken(userInfo);
//       result.accesstoken = tokenInfo.accesstoken;
//       // result.refreshToken = tokenInfo.refreshToken;
//       result.user = await this.authService.verify(tokenInfo.accesstoken);
//       //解析
//       return { code: 200, message: '登录成功', data: result };
//     } else {
//       throw new HttpException(
//         { code: -1, message: '账号不存在或者密码错误' },
//         HttpStatus.OK,
//       );
//     }
//     // return this.userService.saveUser(user);
//   }
// }
