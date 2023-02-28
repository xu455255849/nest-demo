import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Redirect,
  Body,
  Query,
} from '@nestjs/common';
import { CreateCatDto, ListAllEntities } from './types';

@Controller('cats')
export class CatsController {
  @Get()
  @Header('Cache-Control', 'none')
  list(@Query() query: ListAllEntities): string {
    console.log(query, 11);
    return `This action returns all cats limited ${query.pageSize}`;
  }

  @Post()
  @HttpCode(204)
  create(@Body() data: CreateCatDto): string {
    console.log(data, 111);
    return 'This action adds a new cat';
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
}
