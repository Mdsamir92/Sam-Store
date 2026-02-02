import { NextResponse } from "next/server";
import { connect } from "@/app/api/DbConn/dbConn";
import Order from "@/app/api/models/orderModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

connect();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const orders = await Order.find({ userId: session.user.id }).sort({
    createdAt: -1,
  });

  return NextResponse.json(orders);
}
