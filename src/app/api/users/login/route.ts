import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB from "@/app/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import sendEmail from "@/helpers/mailer";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);

    const { email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    // Await the connection to the database
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Email does not exist" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
      isAdmin: existingUser.isAdmin,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    // Create a new NextResponse object to set the cookie
    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        success: true,
      }
    );
   //.........send email to user to verify
 
   await sendEmail({email, emailType:"VERIFY", userId:existingUser._id})

    // Set the cookie with the token
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
