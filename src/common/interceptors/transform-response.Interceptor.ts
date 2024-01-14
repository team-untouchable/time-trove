import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, { data: T }>
{
  intercept(
    _: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ data: T }> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
