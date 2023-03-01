import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Cat } from './types';

export interface saveCat extends Cat {
  id: string;
}

@Injectable()
export class CatsService {
  private readonly cats: saveCat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: string) {
    return this.cats.find((it) => it.id === id);
  }

  create(cat: Cat) {
    const id = uuidv4();
    this.cats.push({
      id,
      ...cat,
    });
    return id;
  }

  update(id: string) {
    //
  }

  delete(id: string) {
    //
  }
}
