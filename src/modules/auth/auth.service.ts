import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // 生成 accesstoken refreshToken
  async genToken(payload: JwtPayload): Promise<any> {
    const accesstoken = this.jwtService.sign(payload, { expiresIn: 3600 * 24 });
    // const refreshToken = this.jwtService.sign(payload, {
    //   expiresIn: jwtConstants.refreshTokenExpiresIn,
    // });
    return { accesstoken }; //refreshToken
  }
  async verify(token: string): Promise<any> {
    const user = this.jwtService.verify(token);
    return { ...user };
  }
  async login(user: User): Promise<any> {
    const userInfo = {
      jti: 1,
      iss: 'cnnngt.top',
      user: user.user_name,
      sub: user.id,
      eamil: 'qjh886@qq.com',
    };
    return {
      token:
        'Bearer ' +
        (await this.jwtService.sign(userInfo, { expiresIn: 3600 * 24 })),
    };
  }
}
