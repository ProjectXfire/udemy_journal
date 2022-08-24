import type { NextApiRequest, NextApiResponse } from "next";
// External libraries
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "DELETE":
      return deleteImage(req, res);
    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}

async function deleteImage(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { id } = req.query;
    console.log(id);
    await cloudinary.uploader.destroy(id as string, { resource_type: "image" });
    return res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Upload error" });
  }
}
