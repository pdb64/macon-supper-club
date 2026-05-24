import { createHash } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

function hasCloudinaryConfig() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function signUpload(params: Record<string, string>, apiSecret: string) {
  const payload = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

export async function uploadSiteImage(file: File) {
  if (hasCloudinaryConfig()) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
    const apiKey = process.env.CLOUDINARY_API_KEY!;
    const apiSecret = process.env.CLOUDINARY_API_SECRET!;
    const timestamp = String(Math.floor(Date.now() / 1000));
    const folder = "macon-supper-club";
    const signature = signUpload({ folder, timestamp }, apiSecret);
    const body = new FormData();
    body.append("file", file);
    body.append("api_key", apiKey);
    body.append("timestamp", timestamp);
    body.append("folder", folder);
    body.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error("Cloudinary upload failed.");
    }

    const data = (await response.json()) as { secure_url: string };
    return data.secure_url;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);
  return `/uploads/${filename}`;
}
