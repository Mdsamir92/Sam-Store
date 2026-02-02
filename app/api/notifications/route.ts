import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connect } from "@/app/api/DbConn/dbConn";
import Notification from "@/app/api/models/notificationModel";

export async function GET() {
  await connect();

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notifications = await Notification.find({
    userId: session.user.id,
  }).sort({ createdAt: -1 });

  return NextResponse.json(notifications);
}
