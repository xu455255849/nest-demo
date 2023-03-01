import { ValidatorOptions, ValidationError } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean; //如果设置为 true ,验证错误不会返回给客户端
  enableDebugMessages?: boolean; //如果设置为 true ，验证器会在出问题的时候打印额外的警告信息
  exceptionFactory?: (errors: ValidationError[]) => any;

}