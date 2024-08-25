"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { PenIcon, Plus, Videotape } from "lucide-react";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { spaceSchema } from "@/schemas/spaceSchema";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";
import Link from "next/link";


export default function SpaceForm({setIsSpaceForm}:{setIsSpaceForm:Function}) {
  const [imgFile,setImgFile] = useState<File | null>(null);
  const [imgUrl,setImgUrl] = useState('/hulk.jpeg');
  const {toast} = useToast();
  const form = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      spaceName: "Website Name",
      spaceUrl:"website-name",
      headerTitle: "Feedback Form",
      imageUrl:"/hulk.jpeg",
      isSquare:true,
      customMessage: "Share your thoughts and suggestions",
      question: [
        "What was your favorite color?",
        "What do you enjoy doing in your free time?",
      ],
      language: "english",
      isStars: true,
      collectionType: "textAndVideo",
    },
  });
  const onSubmit = async (values: z.infer<typeof spaceSchema>) => {
    if(!imgFile) return;
    const formData = new FormData();
    formData.append('image',imgFile);
    try {
      const response = await axios.post("/api/cloudinary-upload",formData);
      values.imageUrl = response.data.image;
      const response2 = await axios.post('/api/space',values);
      if(response2.status === 200){
        form.reset();
        setImgFile(null);
        setImgUrl('/hulk.jpeg');
        revalidatePath('/dashboard');
        setIsSpaceForm(false);
        toast({title:"Successfully Saved Space"})
      }
    } catch (error:any) {
      console.log('error',error.message);
      toast({variant:"destructive",title:"Problem Occured while saving Space"})
    }
  };
  const onChangeHandler = async (e:ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0] || null;
    if(file){
      setImgFile(file);
      const currUrl = URL.createObjectURL(file);
      setImgUrl(currUrl);
    }
    
  }
  return (
    <main className="h-full flex justify-around min-w-max bg-slate-200 py-8 px-44 text-black">
      <div className="flex bg-white rounded-sm py-8 px-5 min-w-full">
        <div className="w-[450px] bg-white border-slate-100 mr-5 border-2 h-fit rounded-lg p-10 flex flex-col justify-center items-center shadow-xl">
          <Image
            src={imgUrl}
            alt="logo"
            width={150}
            height={150}
            className={`object-cover h-36 w-36 mb-10 ${
              form.watch("isSquare") ? "rounded-sm" : "rounded-full"
            }`}
          />
          <h1 className="text-3xl font-bold">{form.watch("headerTitle")}</h1>
          <p className="py-5 px-3">{form.watch("customMessage")}</p>
          <div>
            <h1 className="text-xl font-bold">Questions</h1>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              {form.watch("question").map((ques, key) => (
                <li key={key}>{ques}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-3 w-full">
            <Button className="w-full flex gap-2" variant={"video"}>
              <Videotape className="h-5 w-5" /> Record Video
            </Button>
            <Button className="w-full flex gap-2">
              <PenIcon className="h-5 w-5" /> Write Text
            </Button>
          </div>
        </div>
        <div className="flex-1 min-h-lvh min-w-fit bg-white p-5">
          <h1 className="flex justify-end">
            <Plus className="rotate-45 cursor-pointer" onClick={()=>setIsSpaceForm(false)}/>
          </h1>
          <h1 className="text-3xl font-bold text-center">Create Space</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 px-10 py-5"
            >
              <FormField
                control={form.control}
                name="spaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="write your website name" onChange={(e)=>{field.onChange(e.target.value);
                        form.setValue("spaceUrl",e.target.value?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-'));
                      }}/>
                    </FormControl>
                    <FormDescription className="text-xs ml-2">
                      Public Url is: feedback.to/{form.watch('spaceUrl')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSquare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Shape of logo square ?
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose a Logo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="upload logo for your space"
                        type="file"
                        onChange={onChangeHandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headerTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Header Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="write header for Feedback"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isStars"
                render={({ field }) => (
                  <FormItem className="flex gap-3 items-center">
                    <FormLabel>Collect Star Ratings</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="dehati">Dehati</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collectionType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Collection Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="textAndVideo">
                            Text and Video
                          </SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full " variant={"create"}>
                Create Space
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export const SpaceElement = ({imageUrl,spaceName,spaceUrl}:{imageUrl:string,spaceName:string,spaceUrl:string})=>{
  return (<Link href={"/"+spaceUrl}>
  <div className="flex items-center w-[200px] justify-start gap-5 bg-gray-700 hover:bg-gray-600 rounded-md cursor-pointer">
    <img src={imageUrl} className="h-20 w-20 rounded-tl-md rounded-bl-md object-cover"/>
    <p>{spaceName}</p>
  </div>
  </Link>)
}