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
  },
  username: { 
    type: String, 
  },
  email: { 
    type: String,  
    unique: true 
  },
  password: { 
    type: String, // Password will not be included in queries by default
  },
  name: { 
    type: String, 
  },
  image: { 
    type: String,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  social_configs: {
    instagram: {
      username: { type: String, default: undefined },
      password: { type: String, default: undefined },
      lastUpdated: { type: Date }
    },
    twitter: {
      consumer_key: { type: String, default: undefined},
      consumer_secret: { type: String, default: undefined },
      access_token: { type: String, default: undefined},
      access_token_secret: { type: String, default: undefined},
      lastUpdated: { type: Date }
    },
    linkedin: {
      access_token: { type: String, default: undefined},
      owner_urn: { type: String, default: undefined },
      lastUpdated: { type: Date }
    }
  }
});

const UserModel = models.User || model<IUser>('User', UserSchema);

export default UserModel;