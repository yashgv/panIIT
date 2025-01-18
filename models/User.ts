import { Schema, model, models, Document } from 'mongoose';

// Define interfaces for type safety
interface ISocialConfig {
  instagram?: {
    username: string;
    password: string;
    lastUpdated?: Date;
  };
  twitter?: {
    consumer_key: string;
    consumer_secret: string;
    access_token: string;
    access_token_secret: string;
    lastUpdated?: Date;
  };
  linkedin?: {
    access_token: string;
    owner_urn: string;
    lastUpdated?: Date;
  };
}

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  social_configs: ISocialConfig;
}

const UserSchema = new Schema({
  uid: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String,
    select: false  // Password will not be included in queries by default
  },
  name: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  social_configs: {
    instagram: {
      username: { type: String, default: '' },
      password: { type: String, default: '', select: false },
      lastUpdated: { type: Date }
    },
    twitter: {
      consumer_key: { type: String, default: '', select: false },
      consumer_secret: { type: String, default: '', select: false },
      access_token: { type: String, default: '', select: false },
      access_token_secret: { type: String, default: '', select: false },
      lastUpdated: { type: Date }
    },
    linkedin: {
      access_token: { type: String, default: '', select: false },
      owner_urn: { type: String, default: '' },
      lastUpdated: { type: Date }
    }
  }
});

const UserModel = models.User || model<IUser>('User', UserSchema);

export default UserModel;