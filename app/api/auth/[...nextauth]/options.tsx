import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubPovider from 'next-auth/providers/github';

export const options: NextAuthOptions = {
  providers: [
    GitHubPovider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'UserName:',
          type: 'text',
          placeholder: 'username',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        const user = {
          id: '1',
          name: 'oeyoews',
          password: 'oeyoews',
        };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          console.log('login');
          return user;
        } else {
          console.log('unlogin');
          return null;
        }
      },
    }),
  ],
  pages: {
    // signIn: '/signin',
  },
};
