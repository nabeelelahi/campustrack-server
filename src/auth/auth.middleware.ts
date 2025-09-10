import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'config/constants';
import { UserDto } from 'src/user/dto/user.dto';
import { UserContext } from 'src/user/user.context';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userContext: UserContext,
  ) {}

  async use(_request: Request, _response: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(_request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user = payload._doc as UserDto;
      if (user) {
        this.userContext.set(user);
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      console.log('err', err);
      throw new UnauthorizedException();
    }
    next();
  }

  private extractTokenFromHeader(_request: Request): string | undefined {
    const [type, token] = _request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
