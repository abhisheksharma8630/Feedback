import dbConnect from "@/lib/dbConnect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/model/user";

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req):Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({username:credentials?.username});
                    if(!user){
                        throw new Error("User not found");
                    }
                } catch (error) {
                    if(error){
                        return Promise.reject(error);
                    }
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        })
    ],
    callbacks:{
        async signIn({user,account,profile}){
            console.log(user);
            await dbConnect();
            try {
                const isUserExist = await UserModel.findOne({email:user?.email});
                if(!isUserExist){
                    const newUser = new UserModel({
                        email:user?.email,
                        name:user?.name,
                        image:user?.image,
                        id:user?.id
                    })
                    await newUser.save();
                }
            } catch (error) {
                if(error){
                    console.log(error);
                }
            }
            return true;
        }
        ,
        async jwt({token,user}){
            if(user){
                token._id = user.id;
                token.email = user.email;
                token.name = user?.name;
                token.image = user?.image;
            }
            return token;
        },
        async session({session,token}){
            session.user = {email:token.email,name:token.name,image:token.image,id:token._id};
            return session;
        }
    },
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/auth/login"
    }
})

export { handler as GET, handler as POST }