import bcrypt  from 'bcryptjs';
import User from "@/models/userModel";
import nodemailer from "nodemailer";


const sendEmail=async({email, emailType, userId}:any)=>{
   try {
    const hashedId=await bcrypt.hash(userId.toString(),10);

   if (emailType==="VERIFY") {
    await User.findByIdAndUpdate(userId,{
        verifyToken:hashedId,
        verifyTokenExpiry:Date.now()+360000},{    new:true,
runValidators:true,})

   } else if(emailType==="RESET") {
    await User.findByIdAndUpdate(userId,{
        forgetPasswordToken:hashedId,
        forgetPasswordTokenExpiry:Date.now()+360000},{    new:true,
runValidators:true,})
   }
// ................................................
   var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "afb5c0c86ffdd4",
      pass: "3005dc9d1e8648"
    }
  });
  const mailOptions = {
    from: 'aashiqfarid5555@gmail.com', // sender address
    to: email, // list of receivers
    subject: emailType==="VERIFY" ? "VERIFY YOUR EMAIL" :"RESET YOUR PASSWORD", // Subject line
    text: "Hello world?", // plain text body
    html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedId}">href</a> to ${emailType==="VERIFY"?"VERIFY YOUR EMAIL" :"RESET YOUR PASSWORD" }
    or copy past the link in your browser <br/> ${process.env.domain}/verifyemail?
    token=${hashedId}
    </p>`, // html body
  }

 const mailResponse= await transport.sendMail(mailOptions)
   return mailResponse;
// .............................................
   } catch (error:any) {
      throw new Error(error.message)
   }
}

export default sendEmail;