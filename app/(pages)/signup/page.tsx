'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const [name, setName] = useState<string>('');
  const router = useRouter();

  const handleSetNewName = async () => {
    const res = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      alert(message);
      return;
    }

    alert('User name created successfully');
    router.push('/');
  }
  
  return (
    <div className='min-h-screen min-w-screen content-center'>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create User Name</CardTitle>
          <CardDescription>
            Enter new user name below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="text">user name</Label>
            <Input id="text" type="text" placeholder="user1234" required value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSetNewName}>Sign in</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
