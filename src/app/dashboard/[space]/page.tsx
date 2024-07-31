"use client";
import { useState } from "react";
import SpaceForm from "../../../../components/spaceform";
import Navbar from "../../../../components/navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Credits from "../../../../components/credits";
import {
  ChevronDown,
  Dot,
  Handshake,
  MessageSquare,
  PenIcon,
  RefreshCw,
  Search,
  ThumbsUp,
  Video,
  Videotape,
  WalletCards,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Sidebar from "../../../../components/sidebar";
import FeedbackTemplate from "../../../../components/feedbackTemplate";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function page() {
  const [isSpaceForm, setIsSpaceForm] = useState(false);
  if (isSpaceForm) {
    return <SpaceForm setIsSpaceForm={setIsSpaceForm} />;
  } else {
    return (
      <div>
        <Navbar active={false} />
        <Separator orientation="horizontal" />
        <div className="flex justify-between items-center my-3 px-3">
          <div className="flex space-x-4 items-center h-28">
            <Image
              src="https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/v1722356423/CldUploadWidget-signed/ts242boppl7xz46d63o0.jpg"
              alt="logo"
              width={150}
              height={150}
              className="object-cover h-20 w-20 rounded"
            />
            <div className="flex flex-col justify-evenly">
              <h1 className="text-3xl font-bold">Wanderlust</h1>
              <p className="text-sm font-semibold">
                Space public URL: https://testimonial.to/wanderlust
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Credits icon={<Video />} title="Video Credits" description="2" />
            <Credits
              icon={<MessageSquare />}
              title="Text Credits"
              description="10"
            />
            <Button onClick={() => setIsSpaceForm(true)}>Edit Space</Button>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="flex">
          <div className="w-[25%] h-lvh">
            <Sidebar
              title="Inbox"
              options={[
                {
                  title: "All",
                  link: "/",
                  icon: <Dot size={30} color="#5c60db" strokeWidth={5} />,
                },
                {
                  title: "Video",
                  link: "/",
                  icon: <Dot size={30} color="#f6ad55" strokeWidth={5} />,
                },
                {
                  title: "Text",
                  link: "/",
                  icon: <Dot size={30} color="#1da1f2" strokeWidth={5} />,
                },
                {
                  title: "Archived",
                  link: "/",
                  icon: <Dot size={30} color="#4b5563" strokeWidth={5} />,
                },
                {
                  title: "Liked",
                  link: "/",
                  icon: <Dot size={30} color="#ec625f" strokeWidth={5} />,
                },
              ]}
            />

            <Sidebar
              title="Integrations"
              options={[
                {
                  title: "Social media",
                  link: "/",
                  icon: <Handshake size={20} className="mx-3" />,
                },
                {
                  title: "External Videos",
                  link: "/",
                  icon: <Video size={20} className="mx-3" />,
                },
                {
                  title: "Other reviews",
                  link: "/",
                  icon: <ThumbsUp size={20} className="mx-3" />,
                },
                {
                  title: "Custom cards",
                  link: "/",
                  icon: <WalletCards size={20} className="mx-3" />,
                },
                {
                  title: "Automation",
                  link: "/",
                  icon: <RefreshCw size={20} className="mx-3" />,
                },
              ]}
            />
            {/*<Sidebar
              title="Embeds & Metrics"
              options={[
                { title: "Wall of Love", link: "/" },
                { title: "Single testimonial", link: "/" },
                { title: "Badge", link: "/" },
                { title: "Collecting widget", link: "/" },
                { title: "Matrics", link: "/" },
              ]}
            />
            <Sidebar
              title="Link"
              options={[
                { title: "Public landing page", link: "/" },
                { title: "Wall of Love Page", link: "/" },
                { title: "Share all videos", link: "/" },
                { title: "Custom domain", link: "/" },
              ]}
            />
            <Sidebar
              title="Space Settings"
              options={[
                { title: "Edit the space", link: "/" },
                { title: "Manage Forms", link: "/" },
                { title: "Manage Tags", link: "/" },
                { title: "Reorder in Wall of Love", link: "/" },
                { title: "Invite people to this space", link: "/" },
              ]} */}
            {/* /> */}
          </div>
          <div className="w-[75%] h-lvh px-40 ">
            <div className="flex p-10">
              <div className="flex items-center w-full">
                <Search />
                <Input
                  type="text"
                  className="bg-[rgb(21,23,25)] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Search by name, email, or testimonial keywords"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-white/90 h-10 px-4 py-2">
                  Options
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Customer01</DropdownMenuItem>
                  <DropdownMenuItem>Customer02</DropdownMenuItem>
                  <DropdownMenuItem>Customer03</DropdownMenuItem>
                  <DropdownMenuItem>Customer04</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <FeedbackTemplate />
          </div>
        </div>
      </div>
    );
  }
}
