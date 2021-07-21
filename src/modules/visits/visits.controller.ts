import { Controller, Get, Query } from '@nestjs/common';
// import { MsgEntity } from './social.entity';
import { VisitsService } from './visits.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('api/visits')
@ApiTags('访问量统计')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get('findAll')
  @ApiOperation({ summary: '查询所有访问信息' })
  async findAll(@Query() query: any): Promise<any> {
    return await this.visitsService.findAll(query);
  }
}
