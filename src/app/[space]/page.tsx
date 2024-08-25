"use client";
import { Button } from "@/components/ui/button";
import { Loader, PenIcon, Rat, Videotape } from "lucide-react";
import { Space } from "@/schemas/spaceSchema";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FeedbackForm from "../../../components/feedbackForm";
import { Rating, styled } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'
const StyledRating = styled(Rating)({
  "& .MuiRating-icon": {
    color: "#ffffff",
  },
  "& .MuiRating-iconFilled": {
    color: "#faaf00",
  },
});

export default function Page({params}:{params:{space:string}}) {
  const [data, setData] = useState<Space | null>(null);
  const [isLoading, setLoading] = useState(true)
  useEffect(()=>{
    fetch(`/api/space/?spacename=${params.space}`)
    .then((res) => res.json())
    .then((data) => {
      setData(data.message)
      setLoading(false)
    })
  },[])

  if (isLoading) return <Loader className="animate-spin top-1/2 left-1/2"/>
  if (!data) return <p>No profile data</p>

  return (
    <div className="bg-white h-lvh w-full text-black">
      <h1 className="text-2xl font-bold">Feedback</h1>
      <h1>{JSON.stringify(data)}</h1>
      <div className="flex flex-col items-center justify-center mt-20 mx-20 mb-5">
        <Image
          src={data.imageUrl}
          alt="logo"
          width={150}
          height={150}
          priority={true}
          className={`object-cover h-36 w-36 mb-10 ${
            true ? "rounded-sm" : "rounded-full"
          }`}
        />
        <h1 className="text-5xl font-bold">{data.headerTitle}</h1>
        <p className="py-5 px-3">{data.customMessage}</p>
      </div>
      <div className="w-1/3 mx-auto">
        <h1 className="text-xl font-bold">Questions</h1>
        <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
          {data.question.map((question,idx)=>(<li key={idx}>{question}</li>))}
        </ul>
        <div className="flex space-x-3 justify-center">
          <Button className="w-1/3 flex gap-2" variant={"video"}>
            <Videotape className="h-5 w-5" /> Record Video
          </Button>
          <Dialog>
            <DialogTrigger className="button w-1/3">
              <PenIcon size={20} className="mr-2" /> Send in Text
            </DialogTrigger>
              <DialogContent className={" overflow-y-scroll max-h-screen"}>
                <DialogTitle>Write text testimonial to</DialogTitle>
                <FeedbackForm/>
                <DialogDescription></DialogDescription>
              </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
