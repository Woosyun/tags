'use client'

import { useEffect, useState } from "react";

const page = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user/get');
      const {user} = await res.json();
      setUser(JSON.parse(user));
    }

    fetchUser();
  }, []);
  return (
    <div>
      {JSON.stringify(user, null, 2)}
    </div>
  )
}

export default page;