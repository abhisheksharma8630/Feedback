"use client";
import { signOut, useSession } from "next-auth/react"
export default function page() {
  const{data:session,status} = useSession();
  if(status === "loading"){
    return <div>Loading...</div>
  }
  if(status === 'authenticated'){
    return (
      <div>
      <div>{JSON.stringify(session)}</div>
      <button onClick={()=>signOut()}>Sign Out</button>
      </div>
    )
  }
  return <div>Please Sign in</div>
}
