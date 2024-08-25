"use client";
import {signIn} from 'next-auth/react';
import { FormEvent, useState } from 'react';

export default function page() {
  const [formData,setFormData] = useState({});
  const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await signIn('credentials',formData);
  } 
  const handleChange = (e:any)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      {JSON.stringify(formData)}
        <input type="text" name="username" onChange={handleChange}/>
        <input type="password" name="password" onChange={handleChange}/>
        <button type="submit">Submit</button>
    </form>
  )
}
