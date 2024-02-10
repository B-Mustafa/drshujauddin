import { AuthOptions, ISODateString } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export type CustomUser = {
    id?:string|null;
    name?:string|null;
    email?:string|null;
    role?: string|null;
}

export type CustomSession = {
    user?:CustomUser;
    expires:ISODateString;
}


export const authOptions:AuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",

            credentials: {
                email: { 
                    label: "Email", 
                    type: "email", 
                    placeholder: "Enter your email" 
                },
                password: { 
                    label: "Password", 
                    type: "password" 
                }
              },

              async authorize(credentials, req){

                const user = {
                    id:"1",
                    name:"Shujauddin",
                    email: credentials?.email,
                    password: credentials?.password,
                }

                if(user){
                    return user;
                }
                else{
                    return null;
                }

              }
        })
    ],
    callbacks:{
        async jwt({token , user}) {
            if(user){
                token.user = user;    
            }
            return token;
        },
        async session({session, user , token}) {
            return session
        }
    }
}