import type { NextApiRequest, NextApiResponse } from "next";
// External libraries
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data =
  | {
      message: string;
    }
  | {
      public_id: string;
      secure_url: string;
    };

type FilePath = {
  secure_url: string;
  public_id: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return uploadImage(req, res);
    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}

async function uploadImage(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { public_id, secure_url } = await parseFiles(req);
    return res.status(200).json({ public_id, secure_url });
  } catch (error) {
    return res.status(500).json({ message: "Upload error" });
  }
}

async function parseFiles(req: NextApiRequest): Promise<FilePath> {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      const filePatch = await saveFile(files.file as formidable.File);
      resolve(filePatch);
    });
  });
}

async function saveFile(file: formidable.File): Promise<FilePath> {
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    file.filepath
  );
  return {
    secure_url,
    public_id,
  };
}
