import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto, IdCatDto, ListQueryDto, UpdateCatDto } from './types';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Query() query: ListQueryDto) {
    return this.catsService.findAll(query);
  }

  @Get('export')
  exportCsv(@Res({ passthrough: true }) res) {
    res.set({
      'Content-Disposition': 'attachment; filename="data.csv"',
    });
    return this.catsService.exportCsv();
  }

  @Get('/info')
  findOne(@Query() query: IdCatDto) {
    return this.catsService.findOne(query.id);
  }

  @Post()
  create(@Body() data: CreateCatDto) {
    return this.catsService.create(data);
  }

  @Put()
  update(@Body() data: UpdateCatDto) {
    return this.catsService.update(data);
  }

  @Delete()
  delete(@Query() query: IdCatDto) {
    return this.catsService.delete(query.id);
  }

  @Get('/redirect')
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  @Redirect('https://nestjs.com', 302)
  redirect() {
    return 'redirect';
    /*  return {
      url: 'https://www.google.com.hk/',
      statusCode: 301,
    };*/
  }

  @Get('/custom-res')
  customRes(@Res({ passthrough: true }) res: Response): string {
    res.status(HttpStatus.OK);
    res.setHeader('qqq', 'qwe');
    return 'qw';
  }
}
