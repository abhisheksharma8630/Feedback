import Rating from "@mui/material/Rating";
import { useState } from "react";
import { styled } from "@mui/material";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const StyledRating = styled(Rating)({
  "& .MuiRating-icon": {
    color: "#ffffff",
  },
  "& .MuiRating-iconFilled": {
    color: "#faaf00",
  },
});
export default function FeedbackTemplate() {
  const [rating, setRating] = useState<number | null>(2);
  return (
    <div className="bg-gray-700 hover:bg-gray-600 transition ease-in-out duration-150 rounded-lg border-gray-800 cursor-pointer px-5 py-3">
      <h1>Text</h1>
      <StyledRating
        name="rating"
        size="large"
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        className="outline-white"
      />
      <Image
        alt="feedback-image"
        src="/hulk.jpeg"
        height={200}
        width={200}
        className="rounded"
      />
      <div className="grid grid-cols-2 grid-flow-row gap-2 p-3">
        <div>
          <h1>Name</h1>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/tobey.jpeg" alt="feedback-avatar" />
            </Avatar>
            <p>Tobey Macguire</p>
          </div>
        </div>
        <div>
          <p>Email</p>
          <p>tobey_123</p>
        </div>
        <div>
          <p>Submitted At</p>
          <p>Jul 9, 2024, 9:54:21 PM</p>
        </div>
      </div>
    </div>
  );
}
