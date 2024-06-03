import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB from "@/app/dbConfig/dbConfig";
import sendEmail from "@/helpers/mailer";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const { username, email, password } = reqBody;
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    await connectToDB(); // Await the connection to the database

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
       //.........send email to user to verify
 
   await sendEmail({email, emailType:"VERIFY", userId:savedUser._id})

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
