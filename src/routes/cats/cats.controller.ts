import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Header,
  HttpCode,
  HttpStatus,
  Redirect,
  Body,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto, IdCatDto, ListQueryDto, UpdateCatDto } from './types';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Query() query: ListQueryDto) {
    console.log(query, 11);
    const list = this.catsService.findAll();
    return {
      list,
      total: list.length,
    };
  }

  @Get('/info')
  findOne(@Query() query: IdCatDto) {
    const data = this.catsService.findOne(query.id);
    return { data };
  }

  @Post()
  async create(@Body() data: CreateCatDto) {
    const id = await this.catsService.create(data);
    return { id };
  }

  @Put()
  update(@Body() data: UpdateCatDto) {
    const id = this.catsService.update(data);
    return { id };
  }

  @Delete()
  delete(@Query() query: IdCatDto) {
    const id = this.catsService.delete(query.id);
    return { id };
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
