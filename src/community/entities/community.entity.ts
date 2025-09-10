import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';

export const name = 'community';

export const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  ...baseModel,
});

export const User = mongoose.model(name, schema);
