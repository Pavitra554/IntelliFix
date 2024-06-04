import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };
