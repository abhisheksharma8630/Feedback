import React from 'react'

interface NavItemsProp{
    label:string;
}
export default function NavbarItem({label}:NavItemsProp) {
  return (
    <div>{label}</div>
  )
}
