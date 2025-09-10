import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { statusCodes } from 'config/statusCodes';
import mongoose from 'mongoose';
import { isArray, isNumber } from 'radash';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private logger = new Logger(ResponseInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        if (isArray(data.records) && isNumber(data.count)) {
          const { records, count, pageCount, perPage, currentPage } = data;
          return {
            statusCode: response.statusCode,
            message: statusCodes[response.statusCode],
            data: records,
            pagination: {
              count,
              pageCount,
              perPage,
              currentPage,
            },
          };
        } else {
          return {
            statusCode: response.statusCode,
            message: statusCodes[response.statusCode],
            data: data,
          };
        }
      }),
      catchError((error) => {
        let statusCode: number;
        let message: string | { message: string };
        console.log('error...', error);
        if (error instanceof HttpException) {
          // Handle HTTP exceptions
          statusCode = error.getStatus();
          message = error.getResponse() as string | { message: string };

          if (typeof message === 'object') {
            message = message['message'] || 'An error occurred';
          }
        } else {
          // Handle non-HTTP exceptions
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'Internal Server Error';
        }
        if (error instanceof mongoose.Error.ValidationError) {
          console.log(error);
        }
        // // Optional: Log error details (e.g., for debugging or monitoring)
        this.logger.error('Error caught in interceptor:', {
          error,
          statusCode,
          message,
        });

        // Return a consistent error response
        return throwError(() => ({
          statusCode,
          message,
          path: context.switchToHttp().getRequest().url,
          timestamp: new Date().toISOString(),
        }));
      }),
    );
  }
}
