import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';

export const name = 'doc-guide';

export const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  sub_title: {
    type: String,
    required: true,
  },
  file_url: {
    type: String,
    required: true,
  },
  ...baseModel,
});

export const User = mongoose.model(name, schema);
