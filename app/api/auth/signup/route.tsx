import User from "@/app/api/models/userModal";
import { connect } from "@/app/api/DbConn/dbConn";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { username, email, password } = await req.json();

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: " Email already registered" },
        { status: 400 }
      );
    } else {
      const user = new User({ username, email, password });
      await user.save();
      return NextResponse.json(
        { message: "Register successfully!" },
        { status: 201 }
      );
    }
  } catch (err) {
    return NextResponse.json({ err: "error" }, { status: 500 });
  }
}
