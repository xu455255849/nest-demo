import { BadRequestException, Injectable } from '@nestjs/common';
import { IFIle } from './types';
import { parse } from 'fast-csv';
import { createReadStream } from 'fs';

@Injectable()
export class UploadService {
  constructor() {}

  async importCsv(file: IFIle): Promise<any[] | BadRequestException> {
    console.log(file, 11);
    if (file.mimetype !== 'text/csv')
      return new BadRequestException('导入文件格式错误，请上传csv文件');

    const results = [];
    return new Promise((resolve) => {
      createReadStream('/Users/xushaoping/Documents/person/nest-demo/data.csv')
        .pipe(parse({ headers: true }))
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        });
    });
  }
}
