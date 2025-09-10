import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AccessTokenInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        if (!response.headersSent) {
          const token = this.generateToken(data);
          response.setHeader('Access-Token', token);
        }
        return data;
      }),
    );
  }

  generateToken(user: UserDto): string {
    const payload = { ...user, id: user._id.toString() };
    return this.jwtService.sign(payload);
  }
}
