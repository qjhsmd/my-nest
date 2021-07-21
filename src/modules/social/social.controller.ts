import { Controller, Get } from '@nestjs/common';
import { SocialService } from './social.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('api/social')
@ApiTags('社交信息')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('findAll')
  @ApiOperation({ summary: '查询所有社交信息' })
  async findAll(): Promise<any> {
    return await this.socialService.findAll();
  }
}
