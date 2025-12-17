import { createUploadthing, type FileRouter } from "uploadthing/next";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const f = createUploadthing();

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production"
);

const handleAuth = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("sambad-auth-token")?.value;
  
  if (!token) throw new Error("Unauthorized!");
  
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { userId: payload.userId as string };
  } catch {
    throw new Error("Unauthorized!");
  }
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      console.log("Server Image Upload Completed.");
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      console.log("Message File Upload Completed.");
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
