import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req):Promise<any> {
                console.log(credentials);
                return {username:credentials?.username, email:"abhishek@gmail.com"};   
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id = user.id;
                token.email = user.email;
                token.username = user.username;
            }
            return token;
        },
        async session({session,token}){
            session.user = {email:token.email,username:token.username}
            return session;
        }
    },
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/auth"
    }
})

export { handler as GET, handler as POST }