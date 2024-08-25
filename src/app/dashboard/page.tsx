"use client";
import React from "react";
import Navbar from "../../../components/navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {useState,useEffect} from 'react';
import axios from 'axios';
import SpaceForm, { SpaceElement } from "../../../components/spaceform"

type SpaceElement = [{
  spaceName:string;
  imageUrl:string;
  spaceUrl:string;
}]


export default function page() {
    const [spaceArray,setSpaceArray] = useState<SpaceElement>([{spaceName:"demo",imageUrl:"/hulk.jpeg",spaceUrl:"/demo"}]);
    const [newSpace,setNewSpace] = useState(false);
    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await axios.get('/api/space');
            if(data.status == 200){
              setSpaceArray(data.data.message);
            }
        }
        fetchData();
    },[]);
    if(newSpace) return <SpaceForm setIsSpaceForm={setNewSpace}/>
  return (
    <>
      <Navbar active={false} />
      <div className="flex justify-around items-center">
        <h1 className="text-4xl">Space</h1>
        <p></p>
        <Button className="flex gap-3" size={"sm"} onClick={()=>setNewSpace(true)}>
          <Plus />
          Create New Space
        </Button>
      </div>
      <div>
        {JSON.stringify(spaceArray)}
        {spaceArray.map((space,idx)=>(
          <SpaceElement key={idx} imageUrl={space.imageUrl} spaceName={space.spaceName} spaceUrl={space.spaceUrl}/>
        ))}
      </div>
    </>
  );
}
