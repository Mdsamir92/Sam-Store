import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/api/DbConn/dbConn";
import Order from "@/app/api/models/orderModel";
import Notification from "@/app/api/models/notificationModel";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connect();

    const { id } = await context.params;
    const { action } = await req.json(); // ✅ VERY IMPORTANT

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    /* ================= USER CANCEL REQUEST ================= */
    if (action === "request") {
      if (order.status !== "Placed") {
        return NextResponse.json(
          { message: "Order cannot be cancelled now" },
          { status: 400 }
        );
      }

      order.status = "Cancel Requested";
      await order.save();

      await Notification.create({
        title: "Cancel Request",
        message: `User requested cancellation for order ${order._id}`,
        userId: order.userId,
        orderId: order._id,
      });

      return NextResponse.json({ success: true });
    }

    /* ================= ADMIN APPROVE ================= */
    if (action === "approve") {
      if (order.status !== "Cancel Requested") {
        return NextResponse.json(
          { message: "No cancel request found" },
          { status: 400 }
        );
      }

      order.status = "Cancelled";
      await order.save();

      await Notification.create({
        title: "Order Cancelled",
        message: `Your order ${order._id} has been cancelled`,
        userId: order.userId,
        orderId: order._id,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    console.error("CANCEL ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
