import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Cat } from './types';

interface saveCat extends Cat {
  id: string;
}

@Injectable()
export class CatsService {
  private readonly cats: saveCat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }

  create(cat: Cat) {
    const id = uuidv4();
    this.cats.push({
      id,
      ...cat,
    });
    return id;
  }
}
