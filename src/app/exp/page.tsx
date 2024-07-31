"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CldUploadButton } from "next-cloudinary";

import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Rating } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";


export default function SwitchForm() {

  const [img, setImg] = useState<File | null>(null);
  const [imgpath,setImgPath] = useState("/hulk.jpeg");
  function onChangeHandler(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files){
      setImg(e.target.files[0]);
    }
  }
  async function onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if(!img) return;
      const formData = new FormData();
      formData.append('image',img);
      const response = await axios.post("/api/cloudinary-upload",formData);
      setImgPath(response.data?.image);
    } catch (error:any) {
      console.log("error", error);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <img src={imgpath} height={200} width={200} alt="logo img"/>
        <input type="file" onChange={onChangeHandler}/>
        <button type="submit" >Submit</button>
      </form>
    </>
  );
}
