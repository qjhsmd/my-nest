import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDTO {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly user_name: string;
  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '真实姓名不能为空' })
  readonly pass_word: string;
}
