import 'next-auth';
import { Space } from '@/schemas/spaceSchema';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      username?: string;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    username?: string;
    userId?:string;
    spaces?:[Space];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    username?: string;
  }
}