import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';
import { Role } from 'src/base/base.dto';

export const name = 'question-asnwer';

export const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'question-asnwer',
    default: null,
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'community',
    default: null,
  },
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
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
    },
    email: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
  },
  ...baseModel,
});

export const User = mongoose.model(name, schema);
