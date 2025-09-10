import { randomUUID } from 'crypto';
import { DateTime } from 'luxon';

export default {
  slug: {
    type: String,
    default: randomUUID(),
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: DateTime.now().toUTC(),
  },
  updated_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
};
