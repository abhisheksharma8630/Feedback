import React from "react";
import Navbar from "../../../components/navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function page() {
  return (
    <>
      <Navbar active={false} />
      <div className="flex justify-around items-center">
        <h1 className="text-4xl">Space</h1>
        <p></p>
        <Button className="flex gap-3" size={"sm"}>
          <Plus />
          Create New Space
        </Button>
      </div>
      <iframe
        id="testimonialto-embed-text--O1H9exNGZhGX7YyZTY5"
        src="https://embed-v2.testimonial.to/t/-O1H9exNGZhGX7YyZTY5?design=left-aligned&fontFamily=Inter&fontColor=000000&bgColor=ffffff&borderColor=ABB8C3&starColor=FDCC0D&shadowSize=shadow-none&showBorder=no&showPadding=yes&borderRadius=rounded-lg&borderWidth=border"
        width="100%"
      ></iframe>
    </>
  );
}
