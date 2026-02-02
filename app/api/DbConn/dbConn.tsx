import mongoose from "mongoose";

export async function connect() {
  try {
    const MONGO_URL = process.env.MONGO_URL as string;

    await mongoose.connect(MONGO_URL);
    console.log("connect successful..");
  } catch (error) {
    console.log(error, "something went wrong !");
  }
}
