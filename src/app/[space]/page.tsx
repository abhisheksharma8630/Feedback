"use client";
import { Button } from "@/components/ui/button";
import { PenIcon, Rat, Videotape } from "lucide-react";
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
const StyledRating = styled(Rating)({
  "& .MuiRating-icon": {
    color: "#ffffff",
  },
  "& .MuiRating-iconFilled": {
    color: "#faaf00",
  },
});

export default function Page() {
  return (
    <div className="bg-white h-lvh w-full text-black">
      <h1 className="text-2xl font-bold">Feedback</h1>
      <div className="flex flex-col items-center justify-center mt-20 mx-20 mb-5">
        <Image
          src="/hulk.jpeg"
          alt="logo"
          width={150}
          height={150}
          className={`object-cover h-36 w-36 mb-10 ${
            true ? "rounded-sm" : "rounded-full"
          }`}
        />
        <h1 className="text-5xl font-bold">headerTitle</h1>
        <p className="py-5 px-3">customMessage</p>
      </div>
      <div className="w-1/3 mx-auto">
        <h1 className="text-xl font-bold">Questions</h1>
        <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
          <li>Question 1 : who are you ?</li>
          <li>Question 2 : how are you ?</li>
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
