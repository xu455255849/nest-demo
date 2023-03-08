import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_2_HOURS)
  handleCron() {
    // 只会运行一次
    this.logger.debug('Called when the current second is 45');
  }
}
