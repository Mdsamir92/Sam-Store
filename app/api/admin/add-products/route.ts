import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";
import { connect } from "@/app/api/DbConn/dbConn";
import Product from "@/app/api/models/productModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const price = Number(formData.get("price"));
    const oldPrice = Number(formData.get("oldPrice") || 0);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    const rating = Number(formData.get("rating") || 0);
    const ratingCount = Number(formData.get("ratingCount") || 0);

    const sizesRaw = formData.get("sizes");
    const featuresRaw = formData.get("features");
    const colorsRaw = formData.get("colors");

    const sizes = sizesRaw ? JSON.parse(sizesRaw as string) : [];
    const features = featuresRaw ? JSON.parse(featuresRaw as string) : [];
    const colors = colorsRaw ? JSON.parse(colorsRaw as string) : [];

    /* ================= MAIN IMAGE ================= */
    const imageFile = formData.get("image") as File;
    if (!imageFile) {
      return NextResponse.json(
        { error: "Main image missing" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    const mainImage: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (err, res) => {
          if (err) reject(err);
          resolve(res);
        })
        .end(imageBuffer);
    });

    /* ================= COLOR IMAGES ================= */
    for (let i = 0; i < colors.length; i++) {
      const file = formData.get(`colorImage_${i}`) as File;

      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploaded: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products/colors" }, (err, res) => {
              if (err) reject(err);
              resolve(res);
            })
            .end(buffer);
        });

        colors[i].image = uploaded.secure_url;
      }
    }

    const product = await Product.create({
      title,
      price,
      oldPrice,
      category,
      description,
      sizes,
      features,
      rating,
      ratingCount,
      image: mainImage.secure_url,
      colors,
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error("ADD PRODUCT ERROR 👉", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
