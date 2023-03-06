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
}
