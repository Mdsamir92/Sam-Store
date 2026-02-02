import { connect } from "@/app/api/DbConn/dbConn";
import Notification from "@/app/api/models/notificationModel";
import Order from "@/app/api/models/orderModel";
import { orderDeliveredTemplate } from "@/app/lib/OrderDeliveredTemplate";
import { sendMail } from "@/app/lib/sendMail";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();

    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ❌ same status → no update
    if (existingOrder.status === status) {
      return NextResponse.json(existingOrder);
    }

    // ✅ UPDATE OBJECT
    const updateData: any = { status };

    if (status === "Delivered") {
      updateData.deliveredAt = new Date(); // ✅ SAVE DELIVERY TIME
    }

    // ✅ SINGLE DB UPDATE (IMPORTANT)
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("userId");

    // ✅ SEND EMAIL AFTER DELIVERY
    if (status === "Delivered") {
      try {
        const user: any = updatedOrder.userId;

        if (user?.email && updatedOrder.items?.length) {
          await sendMail({
            to: user.email,
            subject: "📦 Your order has been delivered",
            html: orderDeliveredTemplate({
              username: user.username || "Customer",
              orderId: updatedOrder._id.toString(),
              total: updatedOrder.total,
              product: updatedOrder.items.map((item: any) => ({
                title: item.title,
                image: item.image,
                qty: item.qty,
                size: item.selectedSize,
                color: item.selectedColor,
              })),
            }),
          });
        }
      } catch (err) {
        console.error("DELIVERY EMAIL ERROR:", err);
      }
    }

    // 🔔 Notification
    await Notification.create({
      userId: updatedOrder.userId,
      title: "Order Status Updated",
      message: `Your order is now ${updatedOrder.status}.`,
      orderId: updatedOrder._id,
    });

    return NextResponse.json(updatedOrder);
  } catch (err: any) {
    console.error("ORDER STATUS UPDATE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Order deleted successfully",
      orderId: id,
    });
  } catch (err: any) {
    console.error("ORDER DELETE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

