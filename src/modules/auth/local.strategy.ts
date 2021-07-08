import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
console.log('测试');
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
    this.userService = userService;
  }

  async validate(user_name: string, pass_word: string): Promise<User> {
    const user = await this.userService.findOneByUserName(user_name, pass_word);
    console.log(user);
    if (user) return user;
    else throw new UnauthorizedException('incorrect username or password');
  }

  //   const result = {
  //     accesstoken: '',
  //     user: {},
  //   };
  //   const myUser: any = await this.userService.findOneByUserName(
  //     user.user_name,
  //     user.pass_word,
  //   );
  //   if (myUser) {
  //     const userInfo = {
  //       jti: 1,
  //       iss: 'cnnngt.top',
  //       user: user.user_name,
  //       eamil: 'qjh886@qq.com',
  //     };
  //     // 颁发 token
  //     const tokenInfo = await this.authService.genToken(userInfo);
  //     result.accesstoken = tokenInfo.accesstoken;
  //     // result.refreshToken = tokenInfo.refreshToken;
  //     result.user = await this.authService.verify(tokenInfo.accesstoken);
  //     //解析
  //     return { code: 200, message: '登录成功', data: result };
  //   } else {
  //     throw new HttpException(
  //       { code: -1, message: '账号不存在或者密码错误' },
  //       HttpStatus.OK,
  //     );
  //   }
  //   // return this.userService.saveUser(user);
  // }
}
