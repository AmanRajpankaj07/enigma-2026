//src/services/storage.services.ts
// 1. Changed to a default import
import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";

dotenv.config();

const imageKit = new ImageKit({
  // 2. Removed publicKey; only privateKey and urlEndpoint belong here
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export const uploadImage = async (
  fileBuffer: Buffer,
  fileName: string
) => {
  try {
    // 3. Updated to use the .files namespace
    const result = await imageKit.files.upload({
      file: fileBuffer.toString("base64"),
      fileName,
      folder: "/incidents",
    });

    return result;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};