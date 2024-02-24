import { connect } from "@/database/mongo.config";
import User from "@/model/User";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
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
                connect();


                const user = await User.findOne({email: credentials?.email})


                if(user){
                    return {
                        id: user._id.toString(), // Convert ObjectId to string
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                }
                else{
                    return null;
                }

              }
        })
    ],
    callbacks:{
        async signIn({user, account , profile , email , credentials}){
            connect();
            try{
                const findUSer = await User.findOne({email: user.email});

                if(findUSer){
                    return true;
                }
                await User.create({email: user.email , name:user.name , role: "User"});
                return true;
            } catch(error){
                console.log("error is:" , error);
                return false;
            }
        },

        async jwt({token , user} : {token: JWT , user: CustomUser}) {
            if(user){
                user.role = user?.role == null ? "User" : user.role
                token.user = user;    
            }
            return token;
        },
        async session({session,  token , user}: {session: CustomSession , token: JWT , user:CustomUser}) {
            session.user = token?.user as CustomUser;
            return session
        }
    }
}