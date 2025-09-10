import { Mongoose } from 'mongoose';
import { schema, name } from '../../src/user/entities/user.entity';
import * as bycrypt from 'bcrypt';
import { bycryptConstants } from '../../config/constants';

export default async (mongoose: Mongoose) => {
  const model = mongoose.model(name, schema);
  const data = [
    {
      role: 'super-admin',
      name: 'Super Admin',
      slug: 'super-admin',
      email: 'admin@admin.com',
      mobile_no: 'admin@admin.com',
      password: await bycrypt.hash('Admin@123$', +bycryptConstants.salt),
      username: 'super-admin',
      email_verified: true,
      phone_verified: true,
      created_at: new Date(),
    },
  ];
  try {
    await model.findOneAndDelete({ email: 'admin@admin.com' });
    const records = await model.insertMany(data);
    console.log(name, records);
  } catch (err) {
    console.log('Error while seeding ' + name);
    console.log('Error...', err);
  }
};
