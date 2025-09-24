import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';

export const name = 'attendace';

export const schema = new Schema(
  {
    class: {
      type: Schema.Types.ObjectId,
      ref: 'classes',
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    action: {
      type: String,
    },
    ...baseModel,
  },
  { timestamps: true },
);

export const Class = mongoose.model(name, schema);
