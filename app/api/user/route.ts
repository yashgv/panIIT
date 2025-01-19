import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log('session', session);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.email;

  await dbConnect();

  try {
    const user = await UserModel.findOne({ email: userId });
    console.log('user', user);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error:error}, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { email, name, image, instagram_config, twitter_config, linkedin_config } = await req.json();

  await dbConnect();

  try {
    const user = await UserModel.findOne({uid: userId});
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (email) user.email = email;
    if (name) user.name = name;
    if (image) user.image = image;
    if (instagram_config) user.social_configs.instagram = instagram_config;
    if (twitter_config) user.social_configs.twitter = twitter_config;
    if (linkedin_config) user.social_configs.linkedin = linkedin_config;

    await user.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error:error }, { status: 500 });
  }
}
