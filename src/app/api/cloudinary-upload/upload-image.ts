import cloudinary from "@/lib/cloudinary";


type ApiResponse = {
    url:string
}
export const uploadImage = async (file:File,folder:string)=>{

    const buffer = await file.arrayBuffer();
    const byte = Buffer.from(buffer);

    return new Promise<ApiResponse | undefined>(async (resolve,rejects)=>{
       await cloudinary.uploader.upload_stream({
            resource_type:"auto",
            folder:folder
        },async (err,result)=>{
            if(err) rejects(err.message);
            resolve(result);
        }).end(byte);
    })
}
