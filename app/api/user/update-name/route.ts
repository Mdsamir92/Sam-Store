import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import User from "@/app/api/models/userModal";
import { connect } from "@/app/api/DbConn/dbConn";

connect();

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: "samir" });

    if (!token?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { username } = await req.json();
    if (!username) {
      return NextResponse.json(
        { error: "Username required" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email: token.email },
      { username },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      name: user.username,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Name update failed" },
      { status: 500 }
    );
  }
}
