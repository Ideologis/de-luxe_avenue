import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    {
      slug: "cmsPages",
      fields: [
        {
          name: "title",
          type: "text",
        },
      ],
    },
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || `mongodb://localhost:27017/payload-cms`,
  }),

  // Optional: If you want to resize images, crop, set focal point, etc.
  sharp,
});
