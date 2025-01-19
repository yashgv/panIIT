// src/lib/auth.ts
import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from './mongodb';
import UserModel from '../models/User';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user }) {
      try {
        console.log('User attempting to sign in:', user);
        await dbConnect(); // Ensure the database connection is established
        console.log('Database connected successfully');
        const existingUser = await UserModel.findOne({ email: user.email });
        // console.log('Existing user found:', existingUser);
        console.log('User attempting to sign in:', user);
        if (!existingUser) {
          const newUser = new UserModel({
            uid: user.id,
            username: user.name,
            email: user.email,
            password: '', // Assuming password is not available from Google auth
            name: user.name,
            image: user.image,
            social_configs: {
              instagram: {
                username: '',
                password: '',
                lastUpdated: new Date(),
              },
              twitter: {
                consumer_key: '',
                consumer_secret: '',
                access_token: '',
                access_token_secret: '',
                lastUpdated: new Date(),
              },
              linkedin: {
                access_token: '',
                owner_urn: '',
                lastUpdated: new Date(),
              }
            }
          });
          await newUser.save();
          // console.log('New user created:', newUser);
        }
        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
};
