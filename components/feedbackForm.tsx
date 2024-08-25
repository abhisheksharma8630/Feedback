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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@mui/material";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  response: z.string(),
  image: z.string().optional(),
  username: z.string().min(2, { message: "Name should be more than 2 letter" }),
  useremail: z.string().email(),
  userprofile: z.string().optional(),
  allowedToShare: z.boolean().default(false).optional(),
});

export default function FeedbackForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating:5,
      response: "",
      image: "",
      username: "",
      useremail: "",
      userprofile: "",
      allowedToShare: false,
    },
  });
  const onSumit = (values: z.infer<typeof formSchema>) => {
    // send the data to server
    console.log(values);
  };
  return (
    <div>
      <div className="space-y-2 m-5 text-black">
        <Image
          alt="feedback-form-image"
          src="/hulk.jpeg"
          height={100}
          width={100}
          className="rounded object-cover h-12 w-12 shadow-md"
        />
        <div className="pt-3 pb-2">
          <h2 className="text-lg">Questions</h2>
          <ul className="list-disc ml-5">
            <li>Who are you / what are you working on?</li>
            <li>How has [our product / service] helped you?</li>
            <li>What is the best thing about [our product / service]</li>
          </ul>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumit)} className="space-y-2">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <button></button>
                  <FormControl>
                    <Rating value={field.value} onChange={(_,value)=>field.onChange(value)} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="response"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="focus-visible:ring-blue-700"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach Image</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="useremail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userprofile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Your Photo</FormLabel>
                  <FormControl>
                    <div className=" flex justify-between gap-4 items-center">
                      <Image
                        alt="hulk-image"
                        src={"/hulk.jpeg"}
                        height={150}
                        width={150}
                        className="object-cover w-24 h-24 rounded-full"
                      />
                      <Input type="file" className="w-64 cursor-pointer" {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allowedToShare"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                    I give permission to use this testimonial across social channels and other marketing efforts
                    </FormLabel>
                    
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-5">
              <Button type="submit" variant={"create"}>Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
