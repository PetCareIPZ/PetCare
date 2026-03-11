"eslint-disable only-throw-error";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await auth();

      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),
  visitAttachment:f({
    pdf:{maxFileSize:"2MB"}
  })
    .middleware(async()=>{
      const user =await auth();
      if(!user) throw new UploadThingError("Unauthorized");
      return {userId:user.userId};
    })
    .onUploadComplete(async ({metadata,file})=>{
      console.log("PDF uploaded by:", metadata.userId);
      console.log("PDF URL:",file.ufsUrl);
      return {url: file.ufsUrl};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
