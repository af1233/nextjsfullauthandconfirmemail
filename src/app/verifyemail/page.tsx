 "use client"

import axios from "axios";
import Link from "next/link";
 
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const VerifyEmail = () => {
   const [token, setToken]=useState("")
   const [verifeid, setVerified]=useState(false);
   const [error, setError]=useState(false)
   const getVerifyEmail=async()=>{
    try {
        const res=await axios.post("/api/users/verifymail", {token})
        setVerified(true);
    } catch (error:any) {
        toast.error(error.message)
    }
   }
    useEffect(()=>{
     const validToken=window.location.search.split("=")[1];
     if(validToken){
        setToken(validToken || "")
     }
    },[]);

    useEffect(()=>{
        if (token.length>0) {
          getVerifyEmail()
        }
      },[token])

  return (
    <div className="flex items-center justify-center h-dvh">
        <h2 className="text-2xl">
            Verfiy your Email
        </h2>
        <h3 className="bg-orange-500 p-2 rounded-md text-black"> {token? `${token}`: "no token"} </h3>

        {
            verifeid && (
                <div>
                    <h2>Email Verified</h2>
                    <Link href={"/login"}>
                       <span className="text-blue-500">Go to Login </span>
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail