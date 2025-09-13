import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';

export const name = 'menu-items';

export const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    ...baseModel, // createdAt, updatedAt, deletedAt etc.
  },
  { timestamps: true },
);

export const Class = mongoose.model(name, schema);
