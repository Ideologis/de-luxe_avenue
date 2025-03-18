import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import path from "path";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    {
      slug: "media",
      upload: {
        staticDir: "media", // Directory where files will be stored
        mimeTypes: ["image/*"], // Allow only image files
        imageSizes: [
          {
            name: "thumbnail",
            width: 400,
            height: 300,
            position: "centre",
          },
        ],
      }, // Enable file uploads
      fields: [
        {
          name: "alt",
          type: "text",
          required: true,
        },
        {
          name: "price",
          type: "number",
        },
      ],
      access: {
        read: () => true, // Allow public read access
        // You can also define other access controls for create, update, delete if needed
      },
    },
    {
      slug: "NewArrivals",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "images",
          type: "upload",
          relationTo: "media",
          hasMany: true,
        },
      ],
    },
    {
      slug: "men-images", // Removed extra curly braces
      upload: {
        staticDir: "men",
        mimeTypes: ["image/*"],
      },
      imageSizes: [
        {
          name: "thumbnail",
          width: 400,
          height: 300,
          position: "centre",
        },
      ],
      fields: [
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
  ], // Added closing bracket for collections array

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || `mongodb://localhost:27017/payload-cms`,
  }),

  // Optional: If you want to resize images, crop, set focal point, etc.
  sharp,

  admin: {
    css: path.resolve(__dirname, "app/payload/custom.scss"), // Add your custom CSS file
  },
});
