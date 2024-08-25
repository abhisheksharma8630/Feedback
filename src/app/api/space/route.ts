import dbConnect from "@/lib/dbConnect"
import {Space} from '@/model/space'
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export const POST = async (request:Request)=>{
    await dbConnect();
    const formData = await request.json();
    try{
        const newSpace = new Space(formData);
        await newSpace.save();
        return Response.json({
            success:true,
            message:"New Space Created Successfully"
        },{
            status:200
        })
    } catch(error:any){
        if(error){
            return Response.json({
                success:false,
                message:error.message
            },{status:404});
        }
    }
}

export const GET = async (request:NextRequest)=>{
    await dbConnect();
    const spacename = request.nextUrl.searchParams.get('spacename') || "";
    if(spacename == ""){
        const data = await Space.find({});
        const dataToSend = data.map(({spaceName,imageUrl,spaceUrl})=>({spaceName,imageUrl,spaceUrl}));
        return Response.json({
            success:true,
            message: dataToSend
        },{status:200});
    }
    const dataToSend = await Space.findOne({spaceUrl:spacename});
    if(dataToSend){
        return Response.json({
            success:true,
            message: dataToSend
        },{status:200});
    }else{
        return Response.json({
            success:false,
        },{status:404});
    }

}

export const PUT = async (request:Request)=>{
    return Response.json({
        success:true,
        message:"This is put request"
    },{
        status:200
    })
}