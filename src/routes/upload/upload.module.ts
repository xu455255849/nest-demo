import { Global, Module } from '@nestjs/common';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Global()
@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
