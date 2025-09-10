import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';
import * as bcrypt from 'bcrypt';
import { bycryptConstants } from '../../../config/constants';
import { Gender, Role } from '../../base/base.dto';

export const name = 'users';

export enum Countries {
  OM = 'OM',
  SA = 'SA',
  EG = 'EG',
  SD = 'SD',
  AE = 'AE',
}

export const schema = new Schema({
  role: {
    type: String,
    enum: Object.values(Role),
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_no: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  gender: {
    type: String,
    enum: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  email_verified_at: {
    type: Date,
  },
  phone_verified: {
    type: Boolean,
    default: false,
  },
  phone_verified_at: {
    type: Date,
  },
  verification_code: {
    type: String,
  },
  reset_password_token: {
    type: String,
  },
  ...baseModel,
});

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, +bycryptConstants.salt);
  }
  if (this.isModified('verification_code'))
    this.verification_code = await bcrypt.hash(
      this.verification_code,
      +bycryptConstants.salt,
    );
  if (this.isModified('email') && this.email)
    this.email = this.email.toLowerCase();
  next();
});

export const User = mongoose.model(name, schema);
