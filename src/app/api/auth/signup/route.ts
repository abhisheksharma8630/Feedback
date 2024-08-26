import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import UserModel from "@/model/user";

export async function POST(request:Request){
    await dbConnect();
    const {username,password,email} = await request.json();
    const isUsernameUnique = await UserModel.findOne({username});
    if(isUsernameUnique){
        return Response.json({
            success:false,
            message:"Username already exists"
        })
    }
    const isEmailUnique = await UserModel.findOne({email});
    if(isEmailUnique){
        return Response.json({
            success:false,
            message:"Email already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new UserModel({username,password:hashedPassword,email});
    const savedUser = await user.save();
    return Response.json({
        success:true,
        message:"User Saved Successfully",
        savedUser
    })
}