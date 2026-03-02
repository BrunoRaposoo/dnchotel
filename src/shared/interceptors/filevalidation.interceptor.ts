import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { unlink } from 'fs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestException) {
          const request = context.switchToHttp().getRequest();
          const file = request.file;
          if (file) {
            unlink(file.path, (unlinkErr) => {
              if (unlinkErr) console.error('Error removing file: ', unlinkErr);
            });
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return throwError(() => err);
      }),
    );
  }
}
