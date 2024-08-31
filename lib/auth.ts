import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { getServerSession } from "next-auth"
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import connectToDB from './db/connect';
import User from './db/models/user';
import { createUser } from './db/user';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }: any): Promise<any> {
      // console.log('(jwt) token:', JSON.stringify(token, null, 2));
      // console.log('(jwt) account:', JSON.stringify(account, null, 2));
      // console.log('(jwt) profile:', JSON.stringify(profile, null, 2));

      if (account) {
        token.accessToken = account.accessToken;
      }
      if (profile) {
        token.id = profile.id;
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }: any): Promise<any> {
      // console.log('(session) token: ', JSON.stringify(token, null, 2));

      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.email = token.email;

      await connectToDB();
      const targetUser = await User.findOne({ email: token.email.toString() });
      
      session.user.name = targetUser?.name || token.email;
      
      // console.log('(session) session: ', JSON.stringify(session, null, 2));
      return session;
    },
  }
}

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}