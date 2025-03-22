import NextAuth from 'next-auth';
import { options } from '@/auth';

export const runtime = 'nodejs'

const handler = NextAuth(options);

export { handler as GET, handler as POST }; 