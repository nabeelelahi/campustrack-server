import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';

export const name = 'passport-marker';

export const schema = new Schema({
  passport: {
    type: Schema.Types.ObjectId,
    ref: 'passport',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  ...baseModel,
});

export const User = mongoose.model(name, schema);
