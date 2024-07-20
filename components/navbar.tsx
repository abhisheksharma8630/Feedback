import React from "react";
import NavbarItem from "./navbarItem";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChevronDown, Loader } from "lucide-react";
export default function Navbar({ active }: { active: boolean }) {
  return (
    <div className="flex justify-between items-center pt-8 px-2">
      <h1 className="text-lg font-bold">Feedback</h1>
      {active && (
        <div className="flex gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex">
              Customers <ChevronDown />{" "}
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
          <NavbarItem label="Features" />
          <NavbarItem label="Integration" />
          <NavbarItem label="Pricing" />
        </div>
      )}
      <ClerkLoading>
        <Loader className="h-5 w-5 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <Button color="primary" size={"sm"}>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn >
          <UserButton />
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
}
