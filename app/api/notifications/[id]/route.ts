import { NextRequest, NextResponse } from "next/server";
import Notification from "@/app/api/models/notificationModel";
import { connect } from "@/app/api/DbConn/dbConn";

connect();

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 🔥 IMPORTANT

    await Notification.findByIdAndUpdate(id, {
      isRead: true,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("MARK READ ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
