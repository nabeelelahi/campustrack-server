import user from './user.seeder';

import connect from '../config';

connect().then(async (mongoose) => {
  await user(mongoose);
  process.exit();
});
