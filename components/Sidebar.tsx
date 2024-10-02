'use client'
import { LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('/api/user/get');
      const { user } = await res.json();
      setUser(JSON.parse(user));
    }
    getUser();
  }, []);
  
  return (
    // <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
    <div>
      {!user ? (
        <Button onClick={() => signIn()} className='hover:bg-gray-100'>
          <LogInIcon color="black" />
        </Button>
      ) : (
        <Button onClick={() => signOut()} className='hover:bg-gray-100'>
          <LogOutIcon color="black"/>
        </Button>
      )}
    </div>
  )
}

export default Sidebar