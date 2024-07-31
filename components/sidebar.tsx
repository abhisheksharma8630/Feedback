import { Button } from "@/components/ui/button";
import React from "react";

type Options = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

export default function Sidebar({
  title,
  options,
}: {
  title: string;
  options: Options[];
}) {
  return (
    <div className="px-5 pt-5 flex flex-col gap-2">
      <h1 className="uppercase text-lg text-gray-500 font-bold">{title}</h1>
      <div className="flex flex-col">
        {options.map((option, idx) => (
          <Button
            key={idx}
            variant="ghost"
            size={"sm"}
            className="justify-start font-bold flex "
            >
            {option.icon}
            {option.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
