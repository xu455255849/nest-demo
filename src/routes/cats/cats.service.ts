import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Cat, UpdateCatDto } from './types';

export interface saveCat extends Cat {
  id: string;
}

@Injectable()
export class CatsService {
  private cats: saveCat[] = [];

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

  update(cat: UpdateCatDto) {
    const item = this.cats.find((it) => it.id === cat.id);
    Object.assign(item, cat);
    return cat.id;
  }

  delete(id: string) {
    this.cats.splice(
      this.cats.findIndex((it) => it.id === id),
      1,
    );
    return id;
  }
}
