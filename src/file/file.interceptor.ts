import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { isEmpty } from 'radash';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    if (!isEmpty(request.file)) {
      request.body.file = request.file;
    }
    if (!isEmpty(request.files)) {
      request.body.files = request.files;
    }
    return next.handle();
  }
}
