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
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import {
  Cat,
  CreateCatDto,
  DeleteCatDto,
  ListQuery,
  UpdateCatDto,
} from './types';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(@Query() query: ListQuery): Promise<Cat[]> {
    console.log(query, 11);
    // throw new HttpException('This is a custom message', HttpStatus.FORBIDDEN);
    return this.catsService.findAll();
  }

  @Get('/info')
  findOne(@Query('id', ParseIntPipe) query: { id: number }): string {
    return `This action returns a #${query.id} cat`;
  }

  @Post('/create')
  @HttpCode(204)
  create(@Body() data: CreateCatDto) {
    this.catsService.create(data);
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
  @Header('Cache-Control', 'none')
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
