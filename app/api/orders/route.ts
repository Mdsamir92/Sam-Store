import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Order from "@/app/api/models/orderModel";
import { connect } from "@/app/api/DbConn/dbConn";
import { NextResponse } from "next/server";
import Notification from "@/app/api/models/notificationModel";

import { orderPlacedTemplate } from "@/app/lib/OrderSuccessTemplate";
import { sendMail } from "@/app/lib/sendMail";



export async function POST(req: Request) {
  try {
    await connect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
 

    // ✅ CREATE ORDER
    const order = await Order.create({
      userId: session.user.id,
      items: body.items,
      total: body.total,
      paymentMethod: body.paymentMethod,
      shippingAddress: body.shippingAddress,
      status: "Placed",
    });

    // 🔔 USER NOTIFICATION (DB)
    await Notification.create({
      userId: order.userId,
      title: "Order Placed",
      message: `Your order #${order._id} has been placed successfully.`,
      orderId: order._id,
    });

    // 📧 EMAIL (FAIL SAFE)
    try {
      if (session.user.email) {
        await sendMail({
          to: session.user.email!,
          subject: "🛒 Your order has been placed successfully",
          html: orderPlacedTemplate({
            username: session.user.name || "Customer",
            orderId: order._id.toString(),
            total: order.total,
            deliveryDate: "Expected delivery within 2 days",
            address: {
              name: body.shippingAddress.fullName,
              line1: body.shippingAddress.address,
              city: body.shippingAddress.city,
              state: body.shippingAddress.state,
              pincode: body.shippingAddress.pincode,
              phone: body.shippingAddress.phone,
            },
            product: order.items.map((item: any) => ({
              title: item.title,
              image: item.image,
              qty: item.qty,
              size: item.selectedSize,
              color: item.selectedColor,
            })),
          }),
        });
      }
    } catch (emailError) {
      console.error("EMAIL FAILED:", emailError);
      // ❌ order ko affect mat karo
    }

    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    console.error("ORDER CREATE ERROR:", err);
    return NextResponse.json(
      { message: "Order failed", error: err.message },
      { status: 500 }
    );
  }
}
