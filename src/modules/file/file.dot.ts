import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FileDTO {
  @ApiProperty({ description: '文件name' })
  //   @IsNotEmpty({ message: '用户名不能为空' })
  readonly uploadFile: string;
}
