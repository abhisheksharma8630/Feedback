import { uploadImage } from "./upload-image";



export async function POST(request:Request){
    const formdata = await request.formData();
    const img = formdata.get('image') as unknown as File;
    if(!img){
        return Response.json({
            success:'false',
            message:"Please Upload an Image"
        },{
            status:400
        })
    }
    const data = await uploadImage(img,"next-upload");
    console.log(data?.url);
    return Response.json({
        message: "New post created successfully",
        image:data?.url
    },{
        status:200
    })
}