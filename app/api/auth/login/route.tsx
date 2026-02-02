import User from "@/app/api/models/userModal";
import { connect } from "@/app/api/DbConn/dbConn";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";



export async function POST(req: NextRequest) {
  const TOKEN_SECRET =  process.env.NEXTAUTH_SECRET
  try {
    await connect();
    const { email, password } = await req.json();

    const userExist = await User.findOne({ email, password });

    if (!userExist) {
      return NextResponse.json(
        { error: "Please register then login" },
        { status: 401 }
      );
    }

    const tokenData = {
      id: userExist._id,
      username: userExist.username,
      email: userExist.email,
    };

    const token = jwt.sign( tokenData,TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      { message: "Login successfully!" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" }, { status: 500 }
    );
  }
}
