import { NextRequest } from "next/server";

type Params = {
    user:string
}

export const GET = async (request:NextRequest,context:{params:Params})=>{
    console.log(request.nextUrl.searchParams.get('man'));
    return Response.json({
        message:"bas badiya"
    })
}