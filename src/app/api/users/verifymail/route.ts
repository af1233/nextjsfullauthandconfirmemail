import connectToDB from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export async function POST(req:NextRequest) {
    try {
        const reqBody=await req.json();
        const {token}=reqBody;
        console.log("cerifiey token :",token);
        const verifyuser=await User.findOne({
            verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()},
        });
        if(!verifyuser){
            return NextResponse.json({message:"User is not verified",status:400})
            }   

        verifyuser.isVerified=true;
        verifyuser.verifyToken=undefined;
        verifyuser.verifyTokenExpiry=undefined;
        await verifyuser.save();
        return NextResponse.json({message:"User is verified",status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}