'use client'

import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    const isTrue = confirm('is true?');
    alert(isTrue);
  }, []);
  
  return (
    <div>hello</div>
  )
}

export default page