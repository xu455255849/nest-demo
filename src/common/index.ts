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
import { catchError } from 'rxjs/operators';

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
    const req = context.switchToHttp().getRequest();
    if (req.get('x-with-download') === 'true') return next.handle();
    return next.handle().pipe(
      map((data) => ({
        statusCode: HttpStatus.OK,
        message: 'success',
        data,
      })),
    );
  }
}

// 数据处理 避免返回 undefined / null 处理成 []
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((value) => ([undefined, null].includes(value) ? [] : value)));
  }
}

// 异常捕获
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        throw err;
      }),
    );
  }
}
