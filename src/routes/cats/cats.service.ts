import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { CreateCatDto, UpdateCatDto } from './types';
import { Cat, CatDocument } from './cat.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CatsService {
  constructor(
    private configService: ConfigService,
    @InjectModel('Cat') private catModel: Model<CatDocument>,
  ) {}

  async findAll(): Promise<Cat[]> {
    const name = this.configService.get<string>('DATABASE_USER');
    console.log(name, 11);
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
