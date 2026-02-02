import { NextResponse } from "next/server";
import Order from "@/app/api/models/orderModel";
import { connect } from "@/app/api/DbConn/dbConn";

connect();

export async function GET() {
  const orders = await Order.find()
    .populate("userId", "username email")
    .sort({ createdAt: -1 });

  return NextResponse.json(orders);
}
