"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function page() {
  const [formData, setFormData] = useState({});
  const {toast} = useToast();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await signIn("credentials", {
        redirect: false,
        formData,
      });
      if(data?.error){
        toast({
          title:data.error,
          description:"Please try again with valid username and password",
          variant:"destructive",
        })
      }
    } catch (error) {
      if (error) console.log(error);
    }
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGoogleLogin = async()=>{
    try{
      await signIn('google');
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <form onSubmit={(e) => handleSubmit(e)}>
      {JSON.stringify(formData)}
      <input type="text" name="username" onChange={handleChange} />
      <input type="password" name="password" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>

    <button onClick={handleGoogleLogin}>Google login</button>
    </>
  );
}
