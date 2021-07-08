import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtContants } from './jwt.contants';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 获取请求header token值
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: jwtContants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
      console.log('验证');
    //payload：jwt-passport认证jwt通过后解码的结果
    return { user_name: payload.user_name, id: payload.sub };
  }
}
