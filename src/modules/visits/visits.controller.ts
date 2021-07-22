import { Controller, Delete, Get, Query } from '@nestjs/common';
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
  @Delete('remove')
  @ApiOperation({ summary: '删除访问信息' })
  async remove(@Query() query: any): Promise<any> {
    return await this.visitsService.remove(query.id);
  }
}
