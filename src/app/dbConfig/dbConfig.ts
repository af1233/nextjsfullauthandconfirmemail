// import mongoose from "mongoose"

// const connectToDB=async()=>{
//     try {
//      await mongoose.connect(process.env.MONGO_URI!);
//       console.log("MongoDB connected")
//     } catch (error) {
//         console.log(error);
//         console.log("db not connected");
//     }
// }

// export default connectToDB;

// /pages/api/dbConnect.ts
 
import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        if (mongoose.connections && mongoose.connections[0].readyState) {
          return
        }
       await mongoose.connect(process.env.MONGO_URI as string)
       console.log("DB connected");
      } catch (error) {
       console.log("DB not connected");  
      }
};

export default await connectToDB;