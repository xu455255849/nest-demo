/**
 * 全局返回结构包装、API包装
 */
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<T> {
  message: string;
  statusCode: HttpStatus;
  data: T;
}

// 全局数据返回拦截器
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      })),
    );
  }
}
