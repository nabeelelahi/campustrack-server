import { Inject, Injectable, Scope } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UserContext {
  constructor(@Inject(REQUEST) private _request: Request) {}

  set(user: UserDto): UserDto {
    this._request['user'] = user;
    return user;
  }

  get(): UserDto {
    return this._request['user'];
  }
}
