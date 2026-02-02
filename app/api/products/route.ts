import { NextResponse } from "next/server";
import Product from "@/app/api/models/productModel";
import { connect } from "@/app/api/DbConn/dbConn";

connect();

export async function GET() {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

