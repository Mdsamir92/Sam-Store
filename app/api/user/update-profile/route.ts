
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import cloudinary from "@/app/lib/cloudinary";
import User from "@/app/api/models/userModal";
import { connect } from "@/app/api/DbConn/dbConn";

connect();

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req,secret: "samir"});

    if (!token?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Convert file → buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile_images",
            resource_type: "image",
          },
          (error:any, result:any) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    // Save image URL in DB
    await User.findOneAndUpdate(
      { email: token.email },
      { image: uploadResult.secure_url }
    );

    return NextResponse.json({
      success: true,
      image: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("CLOUDINARY ERROR:", error);
    return NextResponse.json(
      { error: "Image upload failed" },
      { status: 500 }
    );
  }
}
