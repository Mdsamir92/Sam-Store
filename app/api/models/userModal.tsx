import mongoose, { Schema,  } from "mongoose";

interface schemaType{
  username:string,
  email:string,
  password:string,
  image?:string
}
const userSchema = new Schema<schemaType>(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String, // 👈🔥 THIS WAS MISSING
      default: null,
    },
    
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
// if already collection name users in database Than its ok otherwise  || its create  new users collection 
export default User;