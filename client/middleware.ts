export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/debug', '/optimize', '/convert'],
  pages: {
    signIn: '/auth/signin',
  },
};
