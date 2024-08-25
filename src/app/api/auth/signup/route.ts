import dbConnect from "@/lib/dbConnect";


export async function POST(request:Request){
    await dbConnect();
    const data = await request.json();

    return Response.json({
        success:true,
        message:"This is post request"
    })
}