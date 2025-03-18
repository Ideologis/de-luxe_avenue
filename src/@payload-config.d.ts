declare module '@payload-config' {
  import { Config } from 'payload'; // Import the Config type from Payload

  const config: Config; // Use the Config type for better type safety
  export default config;
}

declare module 'payload' {
  export interface Media {
    slug: string;
    upload: boolean;
    fields: Array<{
      name: string;
      type: string;
      required?: boolean;
    }>;
  }
} 