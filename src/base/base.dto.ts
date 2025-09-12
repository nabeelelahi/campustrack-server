import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Query } from 'mongoose';

export class BaseCreateDto {
  _id: string;
  slug: string;
  status: boolean;
  created_at: Date;
  upated_at?: Date | null;
  deleted_at?: Date | null;
}
export class BulkDeleteDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  ids: string[];
}

export enum platform {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  APPLE = 'apple',
}

export class BaseGetDto {
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Number of items per page' })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}

export enum FileUploadMode {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export enum device {
  'android',
  'ios',
  'web',
}

export enum mode {
  EMAIL = 'email',
  MOBILE_NO = 'mobile_no',
}

export type GenericDto = { [key: string]: any };

export enum Role {
  SUPERADMIN = 'super-admin',
  STUDENT = 'student',
  STAFF = 'staff',
  TEACHER = 'teacher',
  PARENT = 'parent',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Venue {
  HOME = 'home',
  SALON = 'salon',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed',
  REVIEWED = 'reviewd',
}

export enum VerificationMode {
  MOBILENO = 'mobile_no',
  EMAIL = 'email',
}

export interface PaginatedDataDto<T = any> {
  count: number;
  pageCount: number;
  perPage: number;
  currentPage: number;
  records: T[];
}

export class CondtionQuery {
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Number of items per page' })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ description: 'Search query' })
  @IsOptional()
  @IsString()
  search?: string;
}
export type baseConditionType = Omit<CondtionQuery, 'page' | 'limit'>;

// types for base service

export type findAllReturnType<dto> =
  | PaginatedDataDto<dto>
  | dto[]
  | dto
  | Partial<dto>
  | undefined
  | void;

export type baseServiceReturnType<dto> = dto | Partial<dto> | undefined | void;

export type deleteReturnType =
  | {
      _id?: string;
    }
  | object
  | void;

export type baseFindQueryType<model, dto> = Query<
  dto,
  model,
  unknown,
  model,
  'find'
>;

export type baseFindOneQueryType<model, dto> = Query<
  dto,
  model,
  unknown,
  model,
  'findOne'
>;
