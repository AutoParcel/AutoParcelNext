import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { connectToDb } from "@/utils";
import prisma from "@/prisma";


export const { auth, signIn, signOut } = NextAuth({
  
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try{
          await connectToDb();
          const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
          if (parsedCredentials.success) {
            const { username, password } = parsedCredentials.data;
              const user = await prisma.users.findUnique({
                where:{
                  Username: username,
                  Password: password
                }
              });
              if (user) {
                return credentials;
              }
              else{
                console.log('Invalid credentials');
                return null;
              }
            }
        }
        catch(e){
        console.log(e);
        return null;
        }
        return null;
      },
    }),
  ],
});