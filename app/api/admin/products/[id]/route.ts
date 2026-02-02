import { connect } from "@/app/api/DbConn/dbConn";
import Product from "@/app/api/models/productModel";
import cloudinary from "@/app/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 🔥 IMPORTANT

    const formData = await req.formData();

    const updateData: any = {
      title: formData.get("title"),
      price: Number(formData.get("price")),
      oldPrice: Number(formData.get("oldPrice")),
      category: formData.get("category"),
      description: formData.get("description"),
      rating: Number(formData.get("rating") || 0),
      ratingCount: Number(formData.get("ratingCount") || 0),
      sizes: JSON.parse(formData.get("sizes") as string),
      features: JSON.parse(formData.get("features") as string),
    };

    /* MAIN IMAGE */
    const image = formData.get("image") as File;
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const upload = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });
      updateData.image = upload.secure_url;
    }

    /* COLORS */
    const colors = JSON.parse(formData.get("colors") as string);

    for (let i = 0; i < colors.length; i++) {
      const img = formData.get(`colorImage_${i}`) as File;
      if (img && img.size > 0) {
        const buffer = Buffer.from(await img.arrayBuffer());
        const upload = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products/colors" }, (err, result) => {
              if (err) reject(err);
              resolve(result);
            })
            .end(buffer);
        });
        colors[i].image = upload.secure_url;
      }
    }

    updateData.colors = colors;

    const updated = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}




export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔥 IMPORTANT FIX
    const { id } = await context.params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    /* 🔥 DELETE MAIN IMAGE */
    if (product.image) {
      const publicId = product.image.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }
    }

    /* 🔥 DELETE COLOR IMAGES */
    if (product.colors?.length) {
      for (const c of product.colors) {
        if (c.image) {
          const publicId = c.image.split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`products/colors/${publicId}`);
          }
        }
      }
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}