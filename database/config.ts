import mongoose from 'mongoose';
export const dbUrl = process.env.DATABASE_CONNECTION_STRING;

export default async () => {
  await mongoose.connect(dbUrl);
  return mongoose;
};
