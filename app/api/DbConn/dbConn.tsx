import mongoose from "mongoose";

export async function connect() {
  try {
    const MONGO_URL = "mongodb+srv://mdsamir13968:samir7866@cluster0.7brjblo.mongodb.net/loginData?retryWrites=true&w=majority";
   
    await mongoose.connect(MONGO_URL);
    console.log("connect successful..");
  } catch (error) {
    console.log(error, "something went wrong !");
  }
}
