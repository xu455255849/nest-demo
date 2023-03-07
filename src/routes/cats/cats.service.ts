import {
  InternalServerErrorException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createReadStream } from 'fs';
import { join } from 'path';

import { v4 as uuidv4 } from 'uuid';
import { CreateCatDto, ListQueryDto, UpdateCatDto } from './types';
import { Cat, CatDocument } from './cat.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { createCsvFile } from '../../common/csv-helper';

@Injectable()
export class CatsService {
  constructor(
    private configService: ConfigService,
    @InjectModel('Cat') private catModel: Model<CatDocument>,
  ) {}

  async findAll(query: ListQueryDto): Promise<{ list: Cat[]; total: number }> {
    // const name = this.configService.get<string>('DATABASE_USER');
    const list = await this.catModel
      .find()
      .skip((query.page - 1) * query.pageSize)
      .limit(query.pageSize)
      .exec();

    const total = await this.catModel.find().count();

    return {
      list,
      total,
    };
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ id }).exec();
  }

  async create(cat: CreateCatDto): Promise<Cat> {
    const id = uuidv4();
    const createdCat = new this.catModel({ id, ...cat });
    return createdCat.save();
  }

  async update(cat: UpdateCatDto): Promise<Cat> {
    return this.catModel.findOneAndUpdate(
      { id: cat.id },
      { name: cat.name, age: cat.age },
    );
  }

  delete(id: string): Promise<Cat> {
    return this.catModel.findOneAndDelete({ id });
  }

  async exportCsv(): Promise<StreamableFile | InternalServerErrorException> {
    const list = await this.catModel.find().exec();

    const data = list.map((item) => ({
      id: item.id,
      姓名: item.name,
      年龄: item.age,
    }));

    const isFileCreated = await createCsvFile('data.csv', data);

    if (!isFileCreated)
      return new InternalServerErrorException('服务器文件生成错误！');

    const file = createReadStream(join(process.cwd(), 'data.csv'));
    return new StreamableFile(file);
  }
}
