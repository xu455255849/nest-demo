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
import {
  CreateCatDto,
  DeleteCatDto,
  ListQuery,
  OneQuery,
  UpdateCatDto,
} from './types';

@Controller('cats')
export class CatsController {
  @Get()
  @Header('Cache-Control', 'none')
  list(@Query() query: ListQuery): string {
    console.log(query, 11);
    return `This action returns all cats limited ${query.pageSize}`;
  }

  @Get('/info')
  getOne(@Query() query: OneQuery): string {
    return `This action returns a #${query.id} cat`;
  }

  @Post()
  @HttpCode(204)
  create(@Body() data: CreateCatDto): string {
    console.log(data, 111);
    return 'This action adds a new cat';
  }

  @Put()
  update(@Body() updateParams: UpdateCatDto): string {
    return `This action returns a #${updateParams.id} cat`;
  }

  @Delete()
  delete(@Body() deleteParams: DeleteCatDto): string {
    return `This action removes a #${deleteParams.id} cat`;
  }

  @Get('/redirect')
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
