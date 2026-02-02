import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Notification from "@/app/api/models/notificationModel";
import { connect } from "@/app/api/DbConn/dbConn";

connect();

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Notification.deleteMany({
    userId: session.user.id,
  });

  return NextResponse.json({ success: true });
}
