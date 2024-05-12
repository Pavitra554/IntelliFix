export { default } from 'next-auth/middleware';

export const config = {
    matcher:['/main'],
    pages:{
        signIn:'/auth/signin'
    }
}