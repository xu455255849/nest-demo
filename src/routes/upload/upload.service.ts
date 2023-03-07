import { BadRequestException, Injectable } from '@nestjs/common';
import { IFIle } from './types';

@Injectable()
export class UploadService {
  constructor() {}

  async importCsv(file: IFIle): Promise<string | BadRequestException> {
    console.log(file, 11)
    if (file.mimetype !== 'text/csv')
      return new BadRequestException('导入文件格式错误，请上传csv文件');
    return 'ok';
  }
}

