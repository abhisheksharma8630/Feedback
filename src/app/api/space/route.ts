import dbConnect from "@/lib/dbConnect"
import {Space} from '@/model/space'

export const POST = async (request:Request)=>{
    await dbConnect();
    const formData = await request.json();
    const newSpace = new Space(formData);
    await newSpace.save();
    return Response.json({
        success:true,
        message:"New Space Created Successfully"
    },{
        status:200
    })
}