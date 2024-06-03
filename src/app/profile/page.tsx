"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const ProfilePage = () => {
  const router=useRouter();
  const HandleLogout=async()=>{
      try {
        await axios.get("/api/users/logout")
        toast.success("Logout Successfully")
        router.push("/")
      } catch (error:any) {
        toast.error(error.message)
      }
  }
const [data,setData]=useState("notthing");

  const getUserDetails=async()=>{
    try {
     const res= await axios.get("/api/users/me");
      setData(res.data.data._id)
    } catch (error:any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="bg-black text-white h-dvh flex items-center justify-center gap-2">ProfilePage
      <hr />
      <button onClick={HandleLogout} className="p-2 bg-white text-black rounded-md">LogOut</button>
      <hr />
      <button onClick={getUserDetails}  className="p-2 bg-white text-black rounded-md">getUserDetails</button>

      <h2>
        {data==="nothing"? " nothing": <Link href={`/profile/${data}`}>{data}</Link>} 
      </h2>
    </div>
  )
}

export default ProfilePage