import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { CreateCatDto, UpdateCatDto } from './types';
import { Cat, CatDocument } from './cat.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<CatDocument>) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  findOne(id: string) {
    // return this.cats.find((it) => it.id === id);
  }

  async create(cat: CreateCatDto): Promise<string> {
    const id = uuidv4();
    const createdCat = new this.catModel(cat);
    await createdCat.save();
    return id;
  }

  update(cat: UpdateCatDto) {
    /* const item = this.cats.find((it) => it.id === cat.id);
    Object.assign(item, cat);
    return cat.id;*/
  }

  delete(id: string) {
    /*this.cats.splice(
      this.cats.findIndex((it) => it.id === id),
      1,
    );*/
    return id;
  }
}
