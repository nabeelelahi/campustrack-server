import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';

export const name = 'classes';

export const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'users', // reference to user with role = TEACHER
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users', // references users with role = STUDENT
      },
    ],
    ...baseModel, // createdAt, updatedAt, deletedAt etc.
  },
  { timestamps: true },
);

export const Class = mongoose.model(name, schema);
