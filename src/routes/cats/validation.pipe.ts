import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private schema: Joi.ObjectSchema<any>;
  constructor() {
    this.schema = Joi.object({
      name: Joi.string().alphanum().min(1).max(32),
      age: Joi.number(),
    });
  }
  transform(value: any, metadata: ArgumentMetadata) {
    const error = this.schema.validate(value);
    if (error) throw new BadRequestException(error);
    return value;
  }
}
