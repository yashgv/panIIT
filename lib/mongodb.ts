import mongoose from 'mongoose';

const uri: string = process.env.MONGODB_URI || '';

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let isConnected: boolean = false;

async function dbConnect() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'db', // Specify your database name here
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    isConnected = true;
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

export default dbConnect;